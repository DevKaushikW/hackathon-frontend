// Name-related handlers extracted from MyProfile.jsx

const handleNameChange = (e, setEditedName) => {
  setEditedName(e.target.value);
};

const handleNameSave = (editedName, setProfile, setIsEditingName) => {
  setProfile((prev) => ({ ...prev, name: editedName }));
  setIsEditingName(false);
};

const handleNameCancel = (profile, setEditedName, setIsEditingName) => {
  setEditedName(profile.name);
  setIsEditingName(false);
};

export {
  handleNameChange,
  handleNameSave,
  handleNameCancel
};
