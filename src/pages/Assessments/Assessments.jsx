import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Assessments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const submissionsPerPage = 10;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5180/HackathonAPI/submissions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const submissionsData = await response.json();

        // Load quiz results from localStorage
        const quizResults = JSON.parse(localStorage.getItem('assessmentResults') || '[]');

        // Combine fetched submissions with quiz results
        const combinedSubmissions = [...submissionsData, ...quizResults];

        // Sort combined submissions by full datetime descending (most recent first)
        // Note: 'time' is a relative string; for proper sorting, consider parsing or using a different field
        combinedSubmissions.sort((a, b) => {
          // Simple string comparison as fallback; adjust if absolute dates are available
          return b.time.localeCompare(a.time);
        });

        setAllSubmissions(combinedSubmissions);
        setError(null);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to load submissions data.');
        // Fallback to empty array or localStorage only
        const quizResults = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
        setAllSubmissions(quizResults);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(allSubmissions.length / submissionsPerPage);

  // Get current page submissions
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;

  // Reverse allSubmissions to show most recent first on first page
  const reversedSubmissions = [...allSubmissions].reverse();
  const currentSubmissions = reversedSubmissions.slice(indexOfFirstSubmission, indexOfLastSubmission);
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div style={{ background: "#9be0e4ff", minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Header title="Dashboard" />
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <p><h1>Submissions</h1></p>
          <p>Loading submissions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "#9be0e4ff", minHeight: '100vh' }}>
        <Header title="Dashboard" />
        <div style={{ padding: '50px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p><h1>Submissions</h1></p>
          <p style={{ color: 'red' }}>{error}</p>
          <p>Showing only local quiz results.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#9be0e4ff" }}>
      <Header title="Dashboard" />
      <div style={{ padding: '50px', maxWidth: '900px', margin: '0 auto' , textAlign: 'center'}}>
        <p><h1>Submissions</h1></p>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', marginTop: '20px', border: '1px solid #e1e4e8', borderRadius: '6px', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e1e4e8', backgroundColor: '#f6f8fa' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#24292e', fontWeight: '600', fontSize: '14px' }}>Problem</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#24292e', fontWeight: '600', fontSize: '14px' }}>Language</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#24292e', fontWeight: '600', fontSize: '14px' }}>Time</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#24292e', fontWeight: '600', fontSize: '14px' }}>Result</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#24292e', fontWeight: '600', fontSize: '14px' }}>Score</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#24292e', fontWeight: '600', fontSize: '14px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((submission, index) => (
              <tr key={index} style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgb(27 31 35 / 12%)', borderRadius: '6px', marginBottom: '10px' }}>
                <td style={{ padding: '12px 16px', color: '#0366d6', fontSize: '14px' }}>
                  <a href="#" style={{ color: '#0366d6', textDecoration: 'none' }}>
                    {submission.problem}
                  </a>
                </td>
                <td style={{ padding: '12px 16px', color: '#586069', fontSize: '14px' }}>{submission.language}</td>
                <td style={{ padding: '12px 16px', color: '#586069', fontSize: '14px' }}>{submission.time}</td>
                <td style={{ padding: '12px 16px', color: '#28a745', fontWeight: '600', fontSize: '14px' }}>{submission.result}</td>
                <td style={{ padding: '12px 16px', color: '#586069', fontSize: '14px' }}>
                  {submission.totalQuestions ? `${submission.score}/${submission.totalQuestions}` : submission.score}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #d1d5da',
                      backgroundColor: 'white',
                      color: '#24292e',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      lineHeight: '20px',
                      transition: 'background-color 0.2s ease',
                    }}
                    onClick={() => {
                      if (submission.totalQuestions) {
                        alert(`Quiz Results:\nProblem: ${submission.problem}\nDifficulty: ${submission.difficulty}\nScore: ${submission.score}/${submission.totalQuestions}\nTime: ${submission.time}`);
                      } else {
                        alert(`Viewing results for ${submission.problem}`);
                      }
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f6f8fa'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    View results
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '8px', fontSize: '14px' }}>
          <button
            onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              border: 'none',
              background: 'none',
              cursor: currentPage === 1 ? 'default' : 'pointer',
              color: '#24292e',
              fontWeight: '600',
              fontSize: '18px',
              userSelect: 'none',
            }}
          >
          </button>
          {pageNumbers.map((number, idx) => {
            if (number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
              return (
                <button
                  key={number}
                  onClick={() => handleClick(number)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: number === currentPage ? '#2ea44f' : '#24292e',
                    fontWeight: number === currentPage ? '700' : '600',
                    borderBottom: number === currentPage ? '2px solid #2ea44f' : 'none',
                    padding: '0 6px',
                    userSelect: 'none',
                  }}
                >
                  {number}
                </button>
              );
            } else if (
              (number === currentPage - 3 && number > 1) ||
              (number === currentPage + 3 && number < totalPages)
            ) {
              return <span key={number} style={{ padding: '0 6px' }}>...</span>;
            } else {
              return null;
            }
          })}
          <button
            onClick={() => currentPage < totalPages && handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              border: 'none',
              background: 'none',
              cursor: currentPage === totalPages ? 'default' : 'pointer',
              color: '#24292e',
              fontWeight: '600',
              fontSize: '18px',
              userSelect: 'none',
            }}
          >
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assessments;
