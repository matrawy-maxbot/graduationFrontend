<<<<<<< HEAD
"use client";

import './styles/page.css'; // Import the CSS file
import Image from 'next/image';
import { useState } from 'react';
import { loginUser } from './components/script';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors
    
    try {
      let result = await loginUser({ email, password });
      console.log('Login result:', result);
      
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }
      
      result.data = result.data.data || result.data;
      
      // حفظ التوكن وبيانات المستخدم في كلٍ من localStorage و cookies
      console.log('result.data:',result.data);
      if (result.data?.accessToken) {
        // حفظ التوكن في localStorage للاستخدام في الطلبات الداخلية
        localStorage.setItem('token', result.data.accessToken);
        
        // حفظ التوكن في cookies للاستخدام في middleware
        setCookie('access_token', result.data.accessToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 يوم
          path: '/',
        });
        setCookie('refresh_token', result.data.refreshToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 يوم
          path: '/',
        });
        console.log('result.data.accessToken:',result.data.accessToken);
        
        // حفظ نوع المستخدم في cookies للاستخدام في middleware
        if (result.data.user) {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          setCookie('user_type', result.data.user.type.toString(), {
            maxAge: 30 * 24 * 60 * 60, // 30 يوم
            path: '/',
          });
        }
      }
      
      // Use window.location.href instead of router.push for complete page reload
      // This ensures CSS from the login page doesn't affect the destination page
      if (result.data.user.type === 0) {
        window.location.href = '/students/scheduling';
      } else if (result.data.user.type === 1) {
        window.location.href = '/teachers/assistants/scheduling';
      } else if (result.data.user.type === 2) {
        window.location.href = '/teachers/doctors/scheduling';
      } else if (result.data.user.type === 3) {
        window.location.href = '/admins/statics';
      } else if (result.data.user.type === 4) {
        window.location.href = '/teachers/doctors/scheduling';
      } else {
        window.location.href = '/404';
      }

    } catch (err) {
      console.error('Error in login submit handler:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="logo-container">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <div className="logo-text-details">
            <span className="logo-line-1">6 October</span>
            <span className="logo-line-2">University</span>
          </div>
        </div>
        <h1 className="title">Sign in to College Platform</h1>
        <p className="subtitle">Access your courses and resources</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              {/* Placeholder icon, replace with actual icon if desired */}
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="id@o6u.edu.eg" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              {/* Placeholder icon, replace with actual icon if desired */}
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="signin-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <a href="#" className="forgot-password-link">Forgot password?</a>
        
        <div className="footer-note">
          {/* In a real app, you might have an image here */}
          {/* <img src="/path-to-avatar.png" alt="Support" className="avatar" /> */}
          <p>Need help? <a href="#">Contact IT Support</a></p>
        </div>
      </div>
      
      <div className="login-image-section">
        {/* Placeholder for an image or branding element */}
        <div className="image-placeholder-icon">🖼️</div>
      </div>
    </div>
  );
}
=======
import './styles/page.css'; // Import the CSS file
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="logo-container">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <div className="logo-text-details">
            <span className="logo-line-1">6 October</span>
            <span className="logo-line-2">University</span>
          </div>
        </div>
        <h1 className="title">Sign in to College Platform</h1>
        <p className="subtitle">Access your courses and resources</p>
        
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              {/* Placeholder icon, replace with actual icon if desired */}
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="id@o6u.edu.eg" 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              {/* Placeholder icon, replace with actual icon if desired */}
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="signin-button">Sign in</button>
        </form>
        
        <a href="#" className="forgot-password-link">Forgot password?</a>
        
        <div className="footer-note">
          {/* In a real app, you might have an image here */}
          {/* <img src="/path-to-avatar.png" alt="Support" className="avatar" /> */}
          <p>Need help? <a href="#">Contact IT Support</a></p>
        </div>
      </div>
      
      <div className="login-image-section">
        {/* Placeholder for an image or branding element */}
        <div className="image-placeholder-icon">🖼️</div>
      </div>
    </div>
  );
}
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
