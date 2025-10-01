import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card, CardContent, Typography, Slider } from "@mui/material";

const StartQuiz = () => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(60);
  const [difficulty, setDifficulty] = useState(5); // 5 easiest, 0 hardest
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizInstructions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5180/HackathonAPI/quiz-instructions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInstructions(data.instructions || []);
      } catch (err) {
        setError(err.message);
        setInstructions([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchQuizInstructions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/quiz", { state: { difficulty } });
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, navigate, difficulty]);

  const handleStartTest = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Do you want to cancel this quiz?");
    if (confirmCancel) {
      navigate("/dashboard");
    }
  };

  const handleDifficultyChange = (event, newValue) => {
    setDifficulty(newValue);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "30px"
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Quiz Instructions
          </Typography>
          {loading ? (
            <Typography variant="body1">Loading instructions...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              Error loading instructions: {error}
            </Typography>
          ) : (
            <ul>
              {instructions.map((instruction, index) => (
                <li key={index}>
                  <Typography variant="body1">{instruction}</Typography>
                </li>
              ))}
            </ul>
          )}
          <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
            Test will start Automatically After: Timer of {timer} sec
          </Typography>

          <Typography variant="body1" sx={{ mt: 3 }}>
            Select Difficulty Level (5 = Easiest, 0 = Hardest):
          </Typography>
          <Slider
            value={difficulty}
            onChange={handleDifficultyChange}
            aria-labelledby="difficulty-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={5}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={handleStartTest}
            >
              Start Test
            </button>
            <button
              style={{
                backgroundColor: "#ccc",
                color: "black",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default StartQuiz;
