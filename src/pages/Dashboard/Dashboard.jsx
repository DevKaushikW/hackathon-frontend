import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, LinearProgress } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  const courses = [
    { name: 'C#', progress: 29, note: '25 points to next star' },
    { name: 'SQL', progress: 14, note: 'Get to 35 points to unlock this badge' },
    { name: 'Java', progress: 8, note: '92 points to gold badge' },
    {name : 'C', progress: 50, note: '50 points to gold badge'},
    {name : 'GO', progress: 52, note: '65 points to gold badge'}
  ];

  const assessments = ['Cloud Foundation'];

  return (
    <Box
      sx={{
        backgroundColor: '#9be0e4ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 1250,
      }}
    >
      <Header title="My Dashboard" showUser={true} />

      <Box
        sx={{
          flex: 1,
          padding: '80px 20px 60px',
          maxWidth: 1000,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Courses Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Courses
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} key={index} display="flex" justifyContent="center">
                <Card
                  onClick={() => navigate('/StartQuiz')}
                  sx={{
                    width: 300,
                    height: 180,
                    bgcolor: '#fcfafaff',
                    color: '#121312ff',
                    border: '2px solid #90ee90',
                    borderRadius: 2,
                    boxShadow: '0 8px 16px rgba(57, 255, 20, 0.3)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {course.name}
                    </Typography>
                    <Box sx={{ bgcolor: '#fcfbfbff', borderRadius: 1, overflow: 'hidden', height: 20, mb: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ height: '100%', bgcolor: '#fcfbfbff', '& .MuiLinearProgress-bar': { bgcolor: '#308521ff' } }}
                      />
                    </Box>
                    <Typography variant="body2">{course.note}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Assessments Section */}
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Upcoming Assessments
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {assessments.length > 0 ? (
              assessments.map((assessment, index) => (
                <Grid item xs={12} sm={6} key={index} display="flex" justifyContent="center">
                  <Card
                    onClick={() => navigate('/StartQuiz')}
                    sx={{
                      width: 300,
                      height: 180,
                      bgcolor: '#fcfafaff',
                      color: '#121312ff',
                      border: '2px solid #90ee90',
                      borderRadius: 2,
                      boxShadow: '0 8px 16px rgba(57, 255, 20, 0.3)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {assessment}
                      </Typography>
                      <Typography variant="body2">Assessment scheduled soon</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="success.main">
                No upcoming assessments available.
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Dashboard;
