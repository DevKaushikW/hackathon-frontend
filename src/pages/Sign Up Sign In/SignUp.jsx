import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpSignIn.css';
import oauthService from '../../services/oauthService';
import { apiService } from '../../services/apiService';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        // Add other fields if needed, like experienceLevel, but for now basic
      };

      const user = await apiService.register(userData);

      // Map UserName to name for frontend consistency
      user.name = user.UserName;

      // Set user data for auth
      user.provider = 'local';
      user.picture = user.picture || 'https://via.placeholder.com/150';

      oauthService.currentUser = user;
      oauthService.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(user));

      navigate('/dashboard', { state: { user } });
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await oauthService.authenticateWithProvider(provider);
      if (result.success) {
        navigate('/dashboard', { state: { user: result.user } });
      } else {
        setError(`Failed to sign up with ${provider}: ${result.error}`);
      }
    } catch (err) {
      setError(`An error occurred while signing up with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
    <h1>Hackathon Website</h1>
    <div className="container">
      <h2>Sign Up</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input-field"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <div className="social-login">
        <p>Or sign up with:</p>
        <p>
          <button
            className="social-button google"
            onClick={() => handleOAuthSignUp('google')}
            disabled={isLoading}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg" />
            Continue with Google
          </button>
          </p>
          <div className="social-buttons-container">
          <button 
            className="social-button linkedin" 
            onClick={() => handleOAuthSignUp('linkedin')}
            disabled={isLoading}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg" alt="LinkedIn" />
            LinkedIn
          </button>
          <button
            className="social-button github"
            onClick={() => handleOAuthSignUp('github')}
            disabled={isLoading}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" />
            GitHub
          </button>
          <button
            className="social-button facebook"
            onClick={() => handleOAuthSignUp('facebook')}
            disabled={isLoading}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" />
            Facebook
          </button>
        </div>

        {isLoading && <div className="loading-spinner">Authenticating...</div>}
        <p className="account-text">
          Already have an account? <a href="/">Sign In</a>
        </p>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
