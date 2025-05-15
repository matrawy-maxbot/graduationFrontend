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
