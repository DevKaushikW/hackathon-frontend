const API_BASE = 'http://localhost:5180'; // Backend API base URL from launchSettings

export const apiService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE}/User/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  async getProfileByEmail(email) {
    try {
      const response = await fetch(`${API_BASE}/profile-by-email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('GetProfileByEmail API error:', error);
      throw error;
    }
  },
  async updateProfile(updatedUser) {
  try {
    const response = await fetch(`${API_BASE}/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
 
    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }
 
    return await response.json();
  } catch (error) {
    console.error('UpdateProfile API error:', error);
    throw error;
  }
}
};
