import { useState } from 'react';

const useProfileState = () => {
  const [profile, setProfile] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [editedEmails, setEditedEmails] = useState([]);
  const [editedPhones, setEditedPhones] = useState([]);
  const [editedLocation, setEditedLocation] = useState('');
  const [editedProvider, setEditedProvider] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [editedResume, setEditedResume] = useState(null);
  const [editingWorkExperienceIndex, setEditingWorkExperienceIndex] = useState(null);
  const [editedWorkExperience, setEditedWorkExperience] = useState(null);
  const [isAddingWorkExperience, setIsAddingWorkExperience] = useState(false);
  const [newWorkExperience, setNewWorkExperience] = useState({
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

  return {
    profile,
    setProfile,
    isEditingName,
    setIsEditingName,
    editedName,
    setEditedName,
    isEditingPersonalInfo,
    setIsEditingPersonalInfo,
    editedEmails,
    setEditedEmails,
    editedPhones,
    setEditedPhones,
    editedLocation,
    setEditedLocation,
    editedProvider,
    setEditedProvider,
    editedRole,
    setEditedRole,
    isEditingResume,
    setIsEditingResume,
    editedResume,
    setEditedResume,
    editingWorkExperienceIndex,
    setEditingWorkExperienceIndex,
    editedWorkExperience,
    setEditedWorkExperience,
    isAddingWorkExperience,
    setIsAddingWorkExperience,
    newWorkExperience,
    setNewWorkExperience
  };
};

export default useProfileState;