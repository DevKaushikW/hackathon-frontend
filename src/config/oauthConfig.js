// OAuth Configuration for all providers
// These are demo client IDs - replace with your actual ones when setting up real OAuth apps

export const OAUTH_CONFIG = {
  google: {
    clientId: 'demo-google-client-id',
    redirectUri: window.location.origin + '/auth/callback/google',
    scope: 'openid profile email',
  },
  linkedin: {
    clientId: 'demo-linkedin-client-id',
    redirectUri: window.location.origin + '/auth/callback/linkedin',
    scope: 'r_liteprofile r_emailaddress',
  },
  github: {
    clientId: 'demo-github-client-id',
    redirectUri: window.location.origin + '/auth/callback/github',
    scope: 'user:email',
  },
  facebook: {
    appId: 'demo-facebook-app-id',
    redirectUri: window.location.origin + '/auth/callback/facebook',
    scope: 'email,public_profile',
  }
};

// Mock user data for demonstration
export const MOCK_USERS = {
  google: {
    id: 'google-123',
    email: 'user@gmail.com',
    name: 'Google User',
    picture: 'https://via.placeholder.com/150',
    provider: 'google'
  },
  linkedin: {
    id: 'linkedin-456',
    email: 'user@linkedin.com',
    name: 'LinkedIn User',
    picture: 'https://via.placeholder.com/150',
    provider: 'linkedin'
  },
  github: {
    id: 'github-789',
    email: 'user@github.com',
    name: 'GitHub User',
    picture: 'https://via.placeholder.com/150',
    provider: 'github'
  },
  facebook: {
    id: 'facebook-012',
    email: 'user@facebook.com',
    name: 'Facebook User',
    picture: 'https://via.placeholder.com/150',
    provider: 'facebook'
  }
};
