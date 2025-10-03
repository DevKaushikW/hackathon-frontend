const handleWorkExperienceEdit = (index, profile, setEditingWorkExperienceIndex, setEditedWorkExperience) => {
  setEditingWorkExperienceIndex(index);
  const workExp = profile.workExperience[index];
  setEditedWorkExperience({
    ...workExp,
    title: workExp.title || workExp.role || '',
    responsibilities: workExp.responsibilities?.filter(r => r.trim() !== '') || []
  });
};

const handleWorkExperienceChange = (field, value, setEditedWorkExperience) => {
  setEditedWorkExperience((prev) => ({
    ...prev,
    [field]: value
  }));
};

const handleResponsibilityChange = (index, value, editedWorkExperience, setEditedWorkExperience) => {
  const newResponsibilities = [...editedWorkExperience.responsibilities];
  newResponsibilities[index] = value;
  setEditedWorkExperience((prev) => ({
    ...prev,
    responsibilities: newResponsibilities
  }));
};

const handleAddResponsibility = (editedWorkExperience, setEditedWorkExperience) => {
  setEditedWorkExperience((prev) => ({
    ...prev,
    responsibilities: [...prev.responsibilities, '']
  }));
};

const handleRemoveResponsibility = (index, editedWorkExperience, setEditedWorkExperience) => {
  const newResponsibilities = editedWorkExperience.responsibilities.filter((_, i) => i !== index);
  setEditedWorkExperience((prev) => ({
    ...prev,
    responsibilities: newResponsibilities
  }));
};

const handleWorkExperienceSave = (
  editedWorkExperience,
  editingWorkExperienceIndex,
  setProfile,
  setEditingWorkExperienceIndex,
  setEditedWorkExperience
) => {
  setProfile((prev) => {
    const newWorkExperience = [...prev.workExperience];
    newWorkExperience[editingWorkExperienceIndex] = editedWorkExperience;
    return {
      ...prev,
      workExperience: newWorkExperience
    };
  });
  setEditingWorkExperienceIndex(null);
  setEditedWorkExperience(null);
};

const handleWorkExperienceCancel = (setEditingWorkExperienceIndex, setEditedWorkExperience) => {
  setEditingWorkExperienceIndex(null);
  setEditedWorkExperience(null);
};

const handleAddWorkExperienceSave = (
  newWorkExperience,
  setProfile,
  setIsAddingWorkExperience,
  setNewWorkExperience
) => {
  const duration = `${newWorkExperience.startDate} - ${newWorkExperience.currentlyWorking ? 'Present' : newWorkExperience.endDate}`;
  const workExperienceToAdd = { ...newWorkExperience, duration };
  setProfile((prev) => ({
    ...prev,
    workExperience: [...(prev.workExperience || []), workExperienceToAdd]
  }));
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
    responsibilities: [''],
    duration: ''
  });
};

const handleRemoveWorkExperience = (index, profile, setProfile, setEditingWorkExperienceIndex, setEditedWorkExperience) => {
  const updatedList = profile.workExperience.filter((_, i) => i !== index);
  setProfile(prev => ({ ...prev, workExperience: updatedList }));
  setEditingWorkExperienceIndex(null);
  setEditedWorkExperience(null);
};

export {
  handleWorkExperienceEdit,
  handleWorkExperienceChange,
  handleResponsibilityChange,
  handleAddResponsibility,
  handleRemoveResponsibility,
  handleWorkExperienceSave,
  handleWorkExperienceCancel,
  handleAddWorkExperienceSave,
  handleRemoveWorkExperience
};
