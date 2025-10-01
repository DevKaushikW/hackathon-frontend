const handleResumeUpload = (e, setEditedResume) => {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') {
    const fileURL = URL.createObjectURL(file);
    setEditedResume(fileURL);
  } else {
    alert('Please upload a valid PDF file.');
  }
};

const handleResumeDelete = (setEditedResume) => {
  setEditedResume(null);
};

const handleResumeSave = (editedResume, setProfile, setIsEditingResume) => {
  setProfile((prev) => ({ ...prev, resume: editedResume }));
  setIsEditingResume(false);
};

const handleResumeCancel = (profile, setEditedResume, setIsEditingResume) => {
  setEditedResume(profile.resume);
  setIsEditingResume(false);
};

export {
  handleResumeUpload,
  handleResumeDelete,
  handleResumeSave,
  handleResumeCancel
};
