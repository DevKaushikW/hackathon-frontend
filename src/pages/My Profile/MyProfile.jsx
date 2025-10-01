import React, { useState } from 'react';
import useProfileEffects, { handleSaveClick  } from './hooks/useProfileEffects';
import './MyProfile.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useProfileState from './hooks/useProfileState';

import {
  handleNameChange,
  handleNameSave,
  handleNameCancel
} from './handlers/nameHandlers';

import {
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
} from './handlers/personalInfoHandlers';

import {
  handleResumeUpload,
  handleResumeDelete,
  handleResumeSave,
  handleResumeCancel
} from './handlers/resumeHandlers';

import {
  handleWorkExperienceEdit,
  handleWorkExperienceChange,
  handleResponsibilityChange,
  handleAddResponsibility,
  handleRemoveResponsibility,
  handleWorkExperienceSave,
  handleWorkExperienceCancel,
  handleAddWorkExperienceSave
} from './handlers/workExperienceHandlers';

import { handleEdit } from './handlers/editDispatcher';

const MyProfile = () => {
  const {
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
  } = useProfileState();

  useProfileEffects(
    setProfile,
    setEditedName,
    setEditedEmails,
    setEditedPhones,
    setEditedLocation,
    setEditedProvider,
    setEditedRole,
    setEditedResume,
    isAddingWorkExperience
  );

  if (!profile) return null;

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        <h2>My Profile</h2>

        {/* Name Section */}
        <section>
          <h3>Name</h3>
          {isEditingName ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => handleNameChange(e, setEditedName)}
              />
              <button onClick={() => handleSaveClick(editedName, setProfile, setIsEditingName)}>Save</button>
              <button onClick={() => handleNameCancel(profile, setEditedName, setIsEditingName)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{profile.name}</p>
              <button onClick={() => handleEdit('Name', setIsEditingName, setIsEditingPersonalInfo, setIsEditingResume, (index) => {})}>Edit</button>
            </>
          )}
        </section>

        {/* Personal Information Section */}
        <section>
          <h3>Personal Information</h3>
          {isEditingPersonalInfo ? (
            <>
              {editedEmails.map((email, index) => (
                <div key={index}>
                  <input
                    type="email"
                    value={email}
                  />
                </div>
              ))}
              <p><button onClick={() => handleAddEmail(editedEmails, setEditedEmails)}>Add Email</button></p>

              {editedPhones.map((phone, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value, editedPhones, setEditedPhones)}
                    placeholder='Phone'
                  />
                  <p><button onClick={() => handleRemovePhone(index, editedPhones, setEditedPhones)}>Remove</button></p>
                </div>
              ))}
              <p><button onClick={() => handleAddPhone(editedPhones, setEditedPhones)}>Add Phone</button></p>

              <input
                type="text"
                value={editedLocation}
                onChange={(e) => handleLocationChange(e.target.value, setEditedLocation)}
                placeholder="Location"
              />
              <input
                type="text"
                value={editedProvider}
                onChange={(e) => handleProviderChange(e.target.value, setEditedProvider)}
                placeholder="Provider"
              />
              <input
                type="text"
                value={editedRole}
                onChange={(e) => handleRoleChange(e.target.value, setEditedRole)}
                placeholder="Role"
              />
              <button onClick={() => handleSaveClick(editedEmails, editedPhones, editedLocation, editedProvider, editedRole, setProfile, setIsEditingPersonalInfo)}>Save</button>
              <button onClick={() => handlePersonalInfoCancel(profile, setEditedEmails, setEditedPhones, setEditedLocation, setEditedProvider, setEditedRole, setIsEditingPersonalInfo)}>Cancel</button>
            </>
          ) : (
            <>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone}</p>
              <p>Location: {profile.location}</p>
              <p>Provider: {profile.provider}</p>
              <p>Role: {profile.role}</p>
              <button onClick={() => handleEdit('Personal Information', setIsEditingName, setIsEditingPersonalInfo, setIsEditingResume, (index) => {})}>Edit</button>
            </>
          )}
        </section>

        {/* Resume Section */}
        <section>
          <h3>Resume</h3>
          {isEditingResume ? (
            <>
              <input type="file" accept="application/pdf" onChange={(e) => handleResumeUpload(e, setEditedResume)} />
              {editedResume && <iframe src={editedResume} width="100%" height="400px" title="Resume Preview" />}
              <button onClick={() => handleResumeSave(editedResume, setProfile, setIsEditingResume)}>Save</button>
              <button onClick={() => handleResumeCancel(profile, setEditedResume, setIsEditingResume)}>Cancel</button>
              <button onClick={() => handleResumeDelete(setEditedResume)}>Delete</button>
            </>
          ) : (
            <>
              {profile.resume ? (
                <iframe src={profile.resume} width="100%" height="400px" title="Resume Preview" />
              ) : (
                <p>No resume uploaded.</p>
              )}
              <button onClick={() => handleEdit('Resume', setIsEditingName, setIsEditingPersonalInfo, setIsEditingResume, (index) => {})}>Edit</button>
            </>
          )}
        </section>

        {/* Work Experience Section */}
        <section>
          <h3>Work Experience</h3>
          {profile.workExperience?.map((exp, index) => (
            <div key={index}>
              {editingWorkExperienceIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedWorkExperience.title}
                    onChange={(e) => handleWorkExperienceChange('title', e.target.value, setEditedWorkExperience)}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={editedWorkExperience.company}
                    onChange={(e) => handleWorkExperienceChange('company', e.target.value, setEditedWorkExperience)}
                    placeholder="Company"
                  />
                  <input
                    type="text"
                    value={editedWorkExperience.location}
                    onChange={(e) => handleWorkExperienceChange('location', e.target.value, setEditedWorkExperience)}
                    placeholder="Location"
                  />
                  <textarea
                    value={editedWorkExperience.description}
                    onChange={(e) => handleWorkExperienceChange('description', e.target.value, setEditedWorkExperience)}
                    placeholder="Description"
                  />
                  {editedWorkExperience.responsibilities.map((resp, i) => (
                    <div key={i}>
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => handleResponsibilityChange(i, e.target.value, editedWorkExperience, setEditedWorkExperience)}
                      />
                      <p><button onClick={() => handleRemoveResponsibility(i, editedWorkExperience, setEditedWorkExperience)}>Remove</button></p>
                    </div>
                  ))}
                  <button onClick={() => handleAddResponsibility(editedWorkExperience, setEditedWorkExperience)}>Add Responsibility</button>
                  <button onClick={() => handleWorkExperienceSave(editedWorkExperience, editingWorkExperienceIndex, setProfile, setEditingWorkExperienceIndex, setEditedWorkExperience)}>Save</button>
                  <button onClick={() => handleWorkExperienceCancel(setEditingWorkExperienceIndex, setEditedWorkExperience)}>Cancel</button>
                </>
              ) : (
                <>
                  <h4>{exp.title}</h4>
                  <p>{exp.company} - {exp.location}</p>
                  <p>{exp.duration}</p>
                  <p>{exp.description}</p>
                  <ul>
                    {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  <button onClick={() => handleEdit(`Work Experience ${index + 1}`, setIsEditingName, setIsEditingPersonalInfo, setIsEditingResume, (i) => handleWorkExperienceEdit(i, profile, setEditingWorkExperienceIndex, setEditedWorkExperience))}>Edit</button>
                </>
              )}
            </div>
          ))}

          {isAddingWorkExperience && (
            <div className="add-work-experience-modal">
              <input
                type="text"
                value={newWorkExperience.title}
                onChange={(e) => setNewWorkExperience({ ...newWorkExperience, title: e.target.value })}
                placeholder="Title"
              />
              <input
                type="text"
                value={newWorkExperience.company}
                onChange={(e) => setNewWorkExperience({ ...newWorkExperience, company: e.target.value })}
                placeholder="Company"
              />
              <input
                type="text"
                value={newWorkExperience.location}
                onChange={(e) => setNewWorkExperience({ ...newWorkExperience, location: e.target.value })}
                placeholder="Location"
              />
              <input
                type="date"
                value={newWorkExperience.startDate}
                onChange={(e) => setNewWorkExperience({ ...newWorkExperience, startDate: e.target.value })}
              />
              <input
                type="date"
                value={newWorkExperience.endDate}
                onChange={(e) => setNewWorkExperience({ ...newWorkExperience, endDate: e.target.value })}
              />
              <label>
                <input
                  type="checkbox"
                  checked={newWorkExperience.currentlyWorking}
                  onChange={(e) => setNewWorkExperience({ ...newWorkExperience, currentlyWorking: e.target.checked })}
                />
                Currently Working
              </label>
              <textarea
                value={newWorkExperience.description}
                onChange={(e) => setNewWorkExperience({ ...newWorkExperience, description: e.target.value })}
                placeholder="Description"
              />
              {newWorkExperience.responsibilities.map((resp, i) => (
                <div key={i}>
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => {
                      const updated = [...newWorkExperience.responsibilities];
                      updated[i] = e.target.value;
                      setNewWorkExperience({ ...newWorkExperience, responsibilities: updated });
                    }}
                  />
                  <button onClick={() => {
                    const updated = newWorkExperience.responsibilities.filter((_, idx) => idx !== i);
                    setNewWorkExperience({ ...newWorkExperience, responsibilities: updated });
                  }}>Remove</button>
                </div>
              ))}
              <button onClick={() => setNewWorkExperience({ ...newWorkExperience, responsibilities: [...newWorkExperience.responsibilities, ''] })}>Add Responsibility</button>
              <button onClick={() => handleAddWorkExperienceSave(newWorkExperience, setProfile, setIsAddingWorkExperience, setNewWorkExperience)}>Save</button>
              <button onClick={() => setIsAddingWorkExperience(false)}>Cancel</button>
            </div>
          )}
          <p><button onClick={() => setIsAddingWorkExperience(true)}>Add Work Experience</button></p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
