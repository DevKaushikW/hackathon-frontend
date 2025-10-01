import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUpSignIn.css";
import oauthService from '../../services/oauthService';
import { apiService } from '../../services/apiService';

const SignUpSignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    if (oauthService.isUserAuthenticated()) {
      setCurrentUser(oauthService.getCurrentUser());
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await apiService.login(formData.email, formData.password);
      
      // Add role from form if needed (backend might not return it)
      user.role = formData.role;
      user.provider = 'local';
      user.picture = user.picture || 'https://via.placeholder.com/150';

      oauthService.currentUser = user;
      oauthService.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(user));

      navigate('/dashboard', { state: { user } });
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await oauthService.authenticateWithProvider(provider);
      if (result.success) {
        setCurrentUser(result.user);
        navigate('/dashboard', { state: { user: result.user } });
      } else {
        setError(`Failed to sign in with ${provider}: ${result.error}`);
      }
    } catch (err) {
      setError(`An error occurred while signing in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    oauthService.logout();
    setCurrentUser(null);
    navigate('/');
  };

  if (currentUser) {
    return (
      <div className="container">
        <h2>Welcome, {currentUser.name}!</h2>
        <p>You are already signed in via {currentUser.provider}</p>
        <button onClick={handleLogout} className="submit-button">Sign Out</button>
      </div>
    );
  }

  return (
    <div className="main-container">
    <h1>Hackathon Website</h1>
    <div className="container">
      <h2>Sign In</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            /> Admin
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="moderator"
              checked={formData.role === 'moderator'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            /> Moderator
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === 'user'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            /> User
          </label>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="social-login">
        <p>
          <button className="social-button google"
            onClick={() => handleOAuthSignIn('google')}
            disabled={isLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
              alt="Google"
              className="icon"
            />
            Continue with Google
          </button>
        </p>
        <div className="social-buttons-container">
          <button className="social-button linkedin"
            onClick={() => handleOAuthSignIn('linkedin')}
            disabled={isLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg"
              alt="LinkedIn"
              className="icon"
            />
            LinkedIn
          </button>
          <button className="social-button github"
            onClick={() => handleOAuthSignIn('github')}
            disabled={isLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="icon"
            />
            GitHub
          </button>
          <button className="social-button facebook"
            onClick={() => handleOAuthSignIn('facebook')}
            disabled={isLoading}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="icon"
            />
            Facebook
          </button>
        </div>

        {isLoading && <div className="loading-spinner">Authenticating...</div>}

        <p>or</p>
        <p className="account-text">
          Don't have an account? <a href="/signup">Create Account/Sign up</a>
        </p>
      </div>
    </div>
  </div>
  );
};

export default SignUpSignIn;
