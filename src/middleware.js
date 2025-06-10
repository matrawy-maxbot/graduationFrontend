import { NextResponse } from 'next/server';

// تعريف المسارات العامة التي لا تتطلب مصادقة
const publicPaths = ['/login', '/register', '/forgot-password'];

// تعريف المسارات المسموح بها لكل نوع مستخدم
const authorizedPaths = {
  0: ['/students'], // الطلاب
  1: ['/teachers/assistants'], // المساعدين
  2: ['/teachers/doctors'], // الدكاترة
  3: ['/admins'], // المسؤولين
  4: ['/teachers/doctors'] // نوع إضافي (قد يكون رئيس قسم مثلاً)
};

// التحقق من تصريح المستخدم للوصول إلى المسار
function isAuthorized(userType, path) {
  // المسارات العامة متاحة للجميع
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return true;
  }
  
  // التحقق من الصفحة الرئيسية
  if (path === '/') {
    return true;
  }
  
  // التحقق إذا كان المستخدم غير معرّف أو نوعه غير موجود
  if (userType === undefined || !authorizedPaths[userType]) {
    return false;
  }
  
  // التحقق ما إذا كان المسار الحالي يبدأ بأحد المسارات المصرح بها لنوع المستخدم
  return authorizedPaths[userType].some(authorizedPath => path.startsWith(authorizedPath));
}

// توجيه المستخدم للصفحة المناسبة حسب نوع الحساب
function getUserHomePage(userType) {
  switch (parseInt(userType)) {
    case 0:
      return '/students/scheduling';
    case 1:
      return '/teachers/assistants/scheduling';
    case 2:
      return '/teachers/doctors/scheduling';
    case 3:
      return '/admins/statics';
    case 4:
      return '/teachers/doctors/scheduling';
    default:
      return '/login';
  }
}

// التحقق من صحة التوكن واسترداد معلومات المستخدم من الخادم
async function verifyToken(token) {
  try {
    // استدعاء API للتحقق من التوكن
    const response = await fetch('http://localhost:3001/api/v1/users/verify-token', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    // console.log(response);

    if (!response.ok) {
      return { success: false };
    }

    const data = await response.json();
    return { 
      success: true, 
      user: data.user || (data.data && data.data.user) 
    };
  } catch (error) {
    console.error('Token verification error in middleware:', error);
    return { success: false };
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // تجاهل التحقق لملفات API و_next وملفات الصور
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.') ||
    pathname.startsWith('/images')
  ) {
    console.log('this is a public path:',pathname);
    return NextResponse.next();
  }

  // تجاهل التحقق للمسارات العامة
  if (publicPaths.some(path => pathname.startsWith(path))) {
    // التحقق من وجود توكن، إذا كان موجودًا وفي صفحة عامة مثل login
    // قم بتوجيه المستخدم للصفحة المناسبة
    const authToken = request.cookies.get('access_token')?.value;
    
    if (authToken) {
      // التحقق من صحة التوكن واسترداد معلومات المستخدم
      const verificationResult = await verifyToken(authToken);
      
      if (verificationResult.success && verificationResult.user) {
        const userType = verificationResult.user.type;
        const userHomePage = getUserHomePage(userType);
        
        const url = request.nextUrl.clone();
        url.pathname = userHomePage;
        
        // تحديث كوكي نوع المستخدم
        const response = NextResponse.redirect(url);
        response.cookies.set('user_type', userType.toString(), {
          maxAge: 30 * 24 * 60 * 60, // 30 يوم
          path: '/',
        });
        
        console.log('this is a public path response');
        return response;
      } else {
        // إذا كان التوكن غير صالح، حذفه من الكوكيز
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        response.cookies.delete('user_type');
        console.log('this is a public path else response');
        return response;
      }
    }
    console.log('this is a public path no token response');
    return NextResponse.next();
  }

  // التحقق من وجود التوكن
  const authToken = request.cookies.get('access_token')?.value;
  if (!authToken) {
    // إعادة توجيه إلى صفحة تسجيل الدخول
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    console.log('this is a public path no token response');
    return NextResponse.redirect(url);
  }

  // التحقق من صحة التوكن واسترداد معلومات المستخدم
  const verificationResult = await verifyToken(authToken);
  
  if (!verificationResult.success || !verificationResult.user) {
    // إذا كان التوكن غير صالح، حذفه من الكوكيز وإعادة التوجيه إلى صفحة تسجيل الدخول
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const response = NextResponse.redirect(url);
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('user_type');
    console.log('this is when the token is not valid');
    return response;
  }

  console.log('verificationResult:',verificationResult);

  // التحقق من تصريحات المستخدم للوصول إلى المسار الحالي
  const userType = verificationResult.user.type;
  if (!isAuthorized(userType, pathname)) {
    // إعادة توجيه إلى الصفحة المناسبة لنوع المستخدم
    const userHomePage = getUserHomePage(userType);
    const url = request.nextUrl.clone();
    url.pathname = userHomePage;
    
    // تحديث كوكي نوع المستخدم
    const response = NextResponse.redirect(url);
    response.cookies.set('user_type', userType.toString(), {
      maxAge: 30 * 24 * 60 * 60, // 30 يوم
      path: '/',
    });
    console.log('this is when the user is authorized');
    return response;
  }

  console.log('userType:',userType);
  
  // تحديث كوكي نوع المستخدم في كل مرة
//   const response = NextResponse.next();
//   response.cookies.set('user_type', userType.toString(), {
//     maxAge: 30 * 24 * 60 * 60, // 30 يوم
//     path: '/',
//   });
  
//   return response;
}

// تكوين المسارات التي يعمل عليها middleware
export const config = {
  matcher: [
    /*
     * المطابقة مع كل المسارات ما عدا:
     * 1. /api (API روابط)
     * 2. /_next (ملفات Next.js الداخلية)
     * 3. /_static (الملفات الثابتة إذا تم تكوينها)
     * 4. /images (مجلد الصور)
     * 5. أي ملفات مثل فافيكون.أيكو وروبوتس.تكست وما إلى ذلك
     */
    '/((?!api|_next|_static|images|.*\\.).*)',
  ],
}; 