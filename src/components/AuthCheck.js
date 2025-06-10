"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { verifyToken, checkAuthorization } from '@/app/login/components/script';

export default function AuthCheck() {
  const [isLoading, setIsLoading] = useState(true);
  const currentPath = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      // تجاهل التحقق في صفحة تسجيل الدخول
      if (currentPath === '/login') {
        setIsLoading(false);
        return;
      }

      try {
        // الحصول على التوكن من localStorage
        const token = localStorage.getItem('token');
        
        // إذا لم يوجد توكن، التوجه لصفحة تسجيل الدخول
        if (!token) {
          window.location.href = '/login';
          return;
        }

        // التحقق من صلاحية التوكن
        const result = await verifyToken(token);
        
        // إذا فشل التحقق من التوكن، التوجه لصفحة تسجيل الدخول
        if (!result.success) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }

        // التأكد من أن النتيجة تحتوي على بيانات المستخدم
        if (!result.data || !result.data.user) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }

        const userType = result.data.user.type;
        
        // التحقق مما إذا كان المستخدم مصرح له بالوصول إلى المسار الحالي
        const isAuthorized = checkAuthorization(userType, currentPath);
        
        if (!isAuthorized) {
          // إعادة توجيه المستخدم إلى الصفحة المناسبة له
          if (userType === 0) {
            window.location.href = '/students/scheduling';
          } else if (userType === 1) {
            window.location.href = '/teachers/assistants/scheduling';
          } else if (userType === 2) {
            window.location.href = '/teachers/doctors/scheduling';
          } else if (userType === 3) {
            window.location.href = '/admins/statics';
          } else if (userType === 4) {
            window.location.href = '/teachers/doctors/scheduling';
          } else {
            window.location.href = '/404';
          }
          return;
        }

        // تحديث بيانات المستخدم في localStorage
        localStorage.setItem('user', JSON.stringify(result.data.user));
      } catch (error) {
        console.error('Authentication check failed:', error);
        // في حالة حدوث خطأ، التوجه لصفحة تسجيل الدخول
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [currentPath]);

  // هذا المكون لا يعرض أي شيء، فقط يتحقق من المصادقة
  return null;
} 