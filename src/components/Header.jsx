import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import oauthService from '../services/oauthService';



const Header = ({ title = 'Dashboard', showUser = true }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
  oauthService.logout(); // ✅ Clears session
  navigate('/');         // ✅ Redirects to sign-in
};

  return (
    <header
      style={{
        backgroundColor: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: 'border-box',
        borderBottom: '1px solid #ccc'
      }}
    >
      <h3
        style={{ margin: 0, cursor: 'pointer', color: '#6C63FF' }}
        onClick={() => navigate('/dashboard')}
      >
        {title}
      </h3>

      {showUser && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={toggleDropdown}
            style={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              backgroundColor: 'lightgray',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            FL
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '60px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1000,
                borderRadius: '6px'
              }}
            >
              <ul style={{ listStyleType: 'none', padding: '10px', margin: 0 }}>
                <li
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => navigate('/myprofile')}
                >
                  My Profile
                </li>
                <li
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => navigate('/assessments')}
                >
                  Assessments
                </li>
                <li
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onClick={handleSignOut}
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
