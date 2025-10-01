import { useEffect } from 'react';
import oauthService from "../../../services/oauthService"
import { apiService } from '../../../services/apiService';

const useProfileEffects = (
  setProfile,
  setEditedName,
  setEditedEmails,
  setEditedPhones,
  setEditedLocation,
  setEditedProvider,
  setEditedRole,
  setEditedResume,
  isAddingWorkExperience
) => {
  // Initialize profile from oauthService and profileData
  useEffect(() => {
    const initializeProfile = async () => {
      const user = oauthService.getCurrentUser();
      if (user) {
        try {
          const profileData = await apiService.getProfileByEmail(user.email);

          setProfile({
            name: profileData.username || user.userName || user.name,
            email: profileData.email || user.email,
            provider: user.provider,
            id: user.id,
            role: user.role,
            username: profileData.username || '@avgfcgjfk',
            picture: user.picture || '',
            resume: profileData.resume || '',
            ...profileData
          });
          setEditedName(profileData.username || user.userName || user.name);
          setEditedEmails([profileData.email || user.email]);
          setEditedPhones(profileData.phone ? [profileData.phone] : []);
          setEditedLocation(profileData.location || '');
          setEditedProvider(user.provider || '');
          setEditedRole(user.role || '');
          setEditedResume(profileData.resume || null);
        } catch (err) {
          console.error('Error fetching profile data:', err);
          // Fallback to empty profile data if fetch fails
          setProfile({
            name: user.name,
            email: user.email,
            provider: user.provider,
            id: user.id,
            role: user.role,
            username: '@avgfcgjfk',
            picture: user.picture || '',
            phone: '',
            location: '',
            resume: '',
            badges: [],
            certifications: [],
            workExperience: [],
            skills: [],
            links: []
          });
          setEditedName(user.name);
          setEditedEmails([user.email]);
          setEditedPhones([]);
          setEditedLocation('');
          setEditedProvider(user.provider || '');
          setEditedRole(user.role || '');
          setEditedResume(null);
        }
      }
    };

    initializeProfile();
  }, []);

  // // Lock background scroll when modal is open
  // useEffect(() => {
  //   document.body.style.overflow = isAddingWorkExperience ? 'hidden' : 'auto';
  // }, [isAddingWorkExperience]);
};

export default useProfileEffects;
const handleSaveClick = async (
  editedName,
  setProfile,
  setIsEditingName
) => {
  try {
    const currentUser = oauthService.getCurrentUser();

    if (!currentUser || !currentUser.email) {
      alert('User not authenticated or missing email.');
      return;
    }

    const updatedUser = {
      userName: editedName,
      email: currentUser.email // ✅ use email from current user
    };

    const updatedProfile = await apiService.updateProfile(updatedUser);

    setProfile((prev) => ({
      ...prev,
      name: updatedProfile.userName,
      username: updatedProfile.userName
    }));

    setIsEditingName(false);
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('Failed to update profile. Please try again.');
  }
};

export { handleSaveClick };