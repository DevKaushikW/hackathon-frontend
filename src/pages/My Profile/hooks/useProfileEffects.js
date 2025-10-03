import { useEffect } from 'react';
import oauthService from "../../../services/oauthService";
import { apiService } from '../../../services/apiService';

// Move this function outside
const handleFullProfileSave = async (
  profile,
  editedName,
  editedEmails,
  editedPhones,
  editedLocation,
  editedProvider,
  editedRole,
  editedResume,
  setProfile,
  setIsEditingName,
  setIsEditingPersonalInfo,
  setIsEditingResume,
  setEditingWorkExperienceIndex,
  editedWorkExperience,
  isAddingWorkExperience,
  newWorkExperience,
  setIsAddingWorkExperience,
  setNewWorkExperience
) => {
  try {
    const currentUser = oauthService.getCurrentUser();
    if (!currentUser || !currentUser.email) {
      alert('User not authenticated or missing email.');
      return;
    }

    const secondaryEmailsJson =
      editedEmails.length > 1 ? JSON.stringify(editedEmails.slice(1)) : null;

    const secondaryPhonesJson =
      editedPhones.length > 1 ? JSON.stringify(editedPhones.slice(1)) : null;

    const updatedUser = {
      userName: editedName || profile.name || '',
      email: currentUser.email,
      phone: editedPhones[0]?.trim() || profile.phone || null,
      location: editedLocation ?? profile.location ?? '',
      provider: editedProvider ?? profile.provider ?? '',
      role: editedRole ?? profile.role ?? '',
      resume: editedResume ?? profile.resume ?? '',
      badgesJson: JSON.stringify(profile.badges ?? []),
      certificationsJson: JSON.stringify(profile.certifications ?? []),
      skillsJson: JSON.stringify(profile.skills ?? []),
      workExperienceJson: JSON.stringify(profile.workExperience ?? []),
      linksJson: JSON.stringify(profile.links ?? []),
      ...(secondaryEmailsJson && { secondaryEmailsJson }),
      ...(secondaryPhonesJson && { secondaryPhonesJson })
    };

    const updatedProfile = await apiService.updateProfile(updatedUser);

    setProfile({
      name: updatedProfile.username,
      email: updatedProfile.email || currentUser.email,
      provider: updatedProfile.provider,
      role: updatedProfile.role,
      phone: updatedProfile.phone,
      location: updatedProfile.location,
      resume: updatedProfile.resume,
      badges: updatedProfile.badges || [],
      certifications: updatedProfile.certifications || [],
      skills: updatedProfile.skills || [],
      workExperience: updatedProfile.workExperience || [],
      links: updatedProfile.links || [],
      secondaryEmails: updatedProfile.secondaryEmails || [],
      secondaryPhones: updatedProfile.secondaryPhones || []
    });

    setIsEditingName(false);
    setIsEditingPersonalInfo(false);
    setIsEditingResume(false);
    setEditingWorkExperienceIndex(null);

    if (isAddingWorkExperience) {
      setIsAddingWorkExperience(false);
      setNewWorkExperience({
        title: '',
        company: '',
        role: '',
        location: '',
        currentlyWorking: false,
        startDate: '',
        endDate: '',
        description: '',
        responsibilities: [],
        duration: ''
      });
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('Failed to update profile. Please try again.');
  }
};
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
            phone: profileData.phone || '',
            location: profileData.location || '',
            badges: profileData.badges || [],
            certifications: profileData.certifications || [],
            workExperience: profileData.workExperience || [],
            skills: profileData.skills || [],
            links: profileData.links || [],
            secondaryEmails: profileData.secondaryEmails || [],
            secondaryPhones: profileData.secondaryPhones || []
          });

          setEditedName(profileData.username || user.userName || user.name);
          setEditedEmails([
            profileData.email || user.email,
            ...(profileData.secondaryEmails || [])
          ]);
          setEditedPhones(
            profileData.phone
              ? [profileData.phone, ...(profileData.secondaryPhones || [])]
              : ['']
          );
          setEditedLocation(profileData.location || '');
          setEditedProvider(user.provider || '');
          setEditedRole(user.role || '');
          setEditedResume(profileData.resume || null);
        } catch (err) {
          console.error('Error fetching profile data:', err);
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
            links: [],
            secondaryEmails: [],
            secondaryPhones: []
          });

          setEditedName(user.name);
          setEditedEmails([user.email]);
          setEditedPhones(['']);
          setEditedLocation('');
          setEditedProvider(user.provider || '');
          setEditedRole(user.role || '');
          setEditedResume(null);
        }
      }
    };

    initializeProfile();
  }, []);

  return { handleFullProfileSave };
};

export default useProfileEffects;
export { handleFullProfileSave };