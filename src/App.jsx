import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import SignUpSignIn from './pages/Sign Up Sign In/SignUpSignIn';
import SignUp from './pages/Sign Up Sign In/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProfile from './pages/My Profile/MyProfile';
import Assessments from './pages/Assessments/Assessments';
import StartQuiz from './pages/Quiz/StartQuiz';
import Quiz from './pages/Quiz/Quiz';
import PrivateRoute from './pages/PrivateRoute'; 
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes> {/* Updated from Switch to Routes */}
          <Route path="/" element={<SignUpSignIn />} /> {/* Updated from component to element */}
          <Route path="/signup" element={<SignUp />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/StartQuiz" element={<StartQuiz/>}/>
          <Route path="/Quiz" element={<Quiz/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
