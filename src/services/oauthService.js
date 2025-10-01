// OAuth Service for handling authentication with all providers
import { OAUTH_CONFIG, MOCK_USERS } from '../config/oauthConfig';

class OAuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  // Simulate OAuth flow for demo purposes
  async authenticateWithProvider(provider) {
    try {
      // Simulate OAuth popup/redirect flow
      console.log(`Starting OAuth flow with ${provider}...`);
      
      // In a real implementation, this would open OAuth popup/redirect
      // For demo, we'll simulate a successful authentication
      await this.simulateOAuthFlow(provider);
      
      const user = MOCK_USERS[provider];
      this.currentUser = user;
      this.isAuthenticated = true;
      
      // Store user in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return {
        success: true,
        user: user,
        token: this.generateMockToken(provider)
      };
    } catch (error) {
      console.error(`OAuth authentication failed for ${provider}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Simulate OAuth flow (replace with real OAuth implementation)
  async simulateOAuthFlow(provider) {
    return new Promise((resolve) => {
      // Simulate OAuth popup delay
      setTimeout(() => {
        console.log(`Successfully authenticated with ${provider}`);
        resolve();
      }, 1000);
    });
  }

  // Generate mock token for demo
  generateMockToken(provider) {
    return `mock-jwt-token-${provider}-${Date.now()}`;
  }

  // Check if user is authenticated
  isUserAuthenticated() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Logout user
  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
  }

  // Get OAuth URLs for real implementation (when ready)
  getOAuthUrls() {
    return {
      google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_CONFIG.google.clientId}&redirect_uri=${OAUTH_CONFIG.google.redirectUri}&response_type=code&scope=${encodeURIComponent(OAUTH_CONFIG.google.scope)}`,
      linkedin: `https://www.linkedin.com/oauth/v2/authorization?client_id=${OAUTH_CONFIG.linkedin.clientId}&redirect_uri=${OAUTH_CONFIG.linkedin.redirectUri}&response_type=code&scope=${encodeURIComponent(OAUTH_CONFIG.linkedin.scope)}`,
      github: `https://github.com/login/oauth/authorize?client_id=${OAUTH_CONFIG.github.clientId}&redirect_uri=${OAUTH_CONFIG.github.redirectUri}&scope=${encodeURIComponent(OAUTH_CONFIG.github.scope)}`,
      facebook: `https://www.facebook.com/v12.0/dialog/oauth?client_id=${OAUTH_CONFIG.facebook.appId}&redirect_uri=${OAUTH_CONFIG.facebook.redirectUri}&scope=${encodeURIComponent(OAUTH_CONFIG.facebook.scope)}&response_type=code`
    };
  }
}

// Create and export singleton instance
const oauthService = new OAuthService();
export default oauthService;
