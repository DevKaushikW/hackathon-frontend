// Personal Information handlers extracted from MyProfile.jsx

const handleEmailChange = (index, value, editedEmails, setEditedEmails) => {
  const newEmails = [...editedEmails];
  newEmails[index] = value;
  setEditedEmails(newEmails);
};

const handleAddEmail = (editedEmails, setEditedEmails) => {
  setEditedEmails([...editedEmails, '']);
};

const handleRemoveEmail = (index, editedEmails, setEditedEmails) => {
  const newEmails = editedEmails.filter((_, i) => i !== index);
  setEditedEmails(newEmails);
};

const handlePhoneChange = (index, value, editedPhones, setEditedPhones) => {
  const newPhones = [...editedPhones];
  newPhones[index] = value;
  setEditedPhones(newPhones);
};

const handleAddPhone = (editedPhones, setEditedPhones) => {
  setEditedPhones([...editedPhones, '']);
};

const handleRemovePhone = (index, editedPhones, setEditedPhones) => {
  const newPhones = editedPhones.filter((_, i) => i !== index);
  setEditedPhones(newPhones);
};

const handleLocationChange = (value, setEditedLocation) => {
  setEditedLocation(value);
};

const handleProviderChange = (value, setEditedProvider) => {
  setEditedProvider(value);
};

const handleRoleChange = (value, setEditedRole) => {
  setEditedRole(value);
};

const handlePersonalInfoSave = (
  editedEmails,
  editedPhones,
  editedLocation,
  editedProvider,
  editedRole,
  setProfile,
  setIsEditingPersonalInfo
) => {
  setProfile((prev) => ({
    ...prev,
    email: editedEmails[0],
    phone: editedPhones.length > 0 ? editedPhones[0] : '',
    location: editedLocation,
    provider: editedProvider,
    role: editedRole
  }));
  setIsEditingPersonalInfo(false);
};

const handlePersonalInfoCancel = (
  profile,
  setEditedEmails,
  setEditedPhones,
  setEditedLocation,
  setEditedProvider,
  setEditedRole,
  setIsEditingPersonalInfo
) => {
  setEditedEmails([profile.email]);
  setEditedPhones(profile.phone ? [profile.phone] : []);
  setEditedLocation(profile.location || '');
  setEditedProvider(profile.provider || '');
  setEditedRole(profile.role || '');
  setIsEditingPersonalInfo(false);
};

export {
  handleEmailChange,
  handleAddEmail,
  handleRemoveEmail,
  handlePhoneChange,
  handleAddPhone,
  handleRemovePhone,
  handleLocationChange,
  handleProviderChange,
  handleRoleChange,
  handlePersonalInfoSave,
  handlePersonalInfoCancel
};
