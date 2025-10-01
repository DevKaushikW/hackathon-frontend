const handleEdit = (
  section,
  setIsEditingName,
  setIsEditingPersonalInfo,
  setIsEditingResume,
  handleWorkExperienceEdit
) => {
  if (section === 'Name') {
    setIsEditingName(true);
  } else if (section === 'Personal Information') {
    setIsEditingPersonalInfo(true);
  } else if (section === 'Resume') {
    setIsEditingResume(true);
  } else if (section.startsWith('Work Experience')) {
    const index = parseInt(section.split(' ')[2]) - 1;
    handleWorkExperienceEdit(index);
  } else {
    alert(`Edit ${section} clicked`);
  }
};

export { handleEdit };
