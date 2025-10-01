import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button, Checkbox, FormGroup } from "@mui/material";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty ?? 5;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [allSelections, setAllSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchCSharpQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5180/HackathonAPI/csharp-questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const allQuestions = data.questions;

        // Filter questions based on difficulty rules:
        // At least 5 questions from selected difficulty
        // No questions from difficulty above selected
        // Remaining questions randomly from allowed difficulties below selected
        // Ensure at least one multiple select question

        // Get questions from selected difficulty
        const selectedDifficultyQuestions = allQuestions[difficulty] || [];

        // Get allowed difficulties below selected difficulty
        const allowedDifficulties = Object.keys(allQuestions)
          .map(Number)
          .filter((d) => d < difficulty)
          .sort((a, b) => b - a); // descending order

        // Collect questions from allowed difficulties
        let otherQuestions = [];
        allowedDifficulties.forEach((d) => {
          otherQuestions = otherQuestions.concat(allQuestions[d] || []);
        });

        // Separate multiple select questions (answer is array)
        const allAvailableQuestions = [...selectedDifficultyQuestions, ...otherQuestions];
        const multipleSelectQuestions = allAvailableQuestions.filter(q => Array.isArray(q.answer));
        const singleSelectQuestions = allAvailableQuestions.filter(q => !Array.isArray(q.answer));

        // Ensure at least one multiple select
        let quizQuestions = [];
        if (multipleSelectQuestions.length > 0) {
          // Pick one multiple select randomly
          const randomMultiple = multipleSelectQuestions[Math.floor(Math.random() * multipleSelectQuestions.length)];
          quizQuestions.push(randomMultiple);
        }

        // Fill the rest with random questions, preferring selected difficulty
        const remainingSlots = 9; // 10 total - 1 multiple
        const selectedDiffCount = Math.min(5, selectedDifficultyQuestions.length);
        const selectedDiff = selectedDifficultyQuestions.slice(0, selectedDiffCount);
        const otherDiff = otherQuestions.slice(0, remainingSlots - selectedDiffCount);

        quizQuestions = [...quizQuestions, ...selectedDiff, ...otherDiff];

        // If not enough, add more from single select
        if (quizQuestions.length < 10) {
          const additional = singleSelectQuestions.filter(q => !quizQuestions.includes(q)).slice(0, 10 - quizQuestions.length);
          quizQuestions = [...quizQuestions, ...additional];
        }

        // Shuffle final quizQuestions
        setQuestions(quizQuestions.sort(() => Math.random() - 0.5));
        setAllSelections(new Array(10).fill([]));
      } catch (err) {
        setError(err.message);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCSharpQuestions();
  }, [difficulty]);

  const handleOptionChange = (event, isMultiple) => {
    const value = event.target.value;
    if (isMultiple) {
      setSelectedOptions(prev => {
        if (prev.includes(value)) {
          return prev.filter(opt => opt !== value);
        } else {
          return [...prev, value];
        }
      });
    } else {
      setSelectedOptions([value]);
    }
  };

  const handleNext = () => {
    // Save current selection
    setAllSelections(prev => {
      const newSel = [...prev];
      newSel[currentIndex] = selectedOptions;
      return newSel;
    });

    const currentQuestion = questions[currentIndex];
    const isMultiple = Array.isArray(currentQuestion.answer);
    let correct = false;
    if (isMultiple) {
      correct = selectedOptions.length === currentQuestion.answer.length &&
                selectedOptions.every(opt => currentQuestion.answer.includes(opt));
    } else {
      correct = selectedOptions[0] === currentQuestion.answer;
    }
    if (correct) {
      setScore(score + 1);
    }
    setSelectedOptions([]);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      // Save current selection before going back
      setAllSelections(prev => {
        const newSel = [...prev];
        newSel[currentIndex] = selectedOptions;
        return newSel;
      });
      setCurrentIndex(currentIndex - 1);
      setSelectedOptions(allSelections[currentIndex - 1]);
    }
  };

  const handleClear = () => {
    setSelectedOptions([]);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedOptions([]);
    setShowScore(false);
  };

  const handleEndAssessment = () => {
    // Save assessment results to localStorage
    const assessmentResult = {
      problem: `C# Quiz - Difficulty ${difficulty}`,
      language: 'C#',
      time: new Date().toLocaleString(),
      result: 'Completed',
      score: score,
      totalQuestions: questions.length,
      difficulty: difficulty
    };

    const existingResults = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
    existingResults.push(assessmentResult);
    localStorage.setItem('assessmentResults', JSON.stringify(existingResults));

    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <Typography>Loading questions...</Typography>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <Typography color="error">Error loading questions: {error}</Typography>
        <Footer />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div>
        <Header />
        <Typography>No questions available.</Typography>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 64px - 64px)", display: "flex", flexDirection: "column" }}>
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ maxWidth: 700, width: "100%", padding: 3 }}>
          <CardContent>
            {showScore ? (
              <div>
                <Typography variant="h5" gutterBottom>
                  Your Score: {score} / {questions.length}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleRestart} sx={{ mr: 2 }}>
                  Restart Quiz
                </Button>
                <Button variant="contained" color="secondary" onClick={handleEndAssessment}>
                  End Assessment
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant="h6" gutterBottom>
                  Question {currentIndex + 1} of {questions.length}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {questions[currentIndex].question}
                </Typography>
                {Array.isArray(questions[currentIndex].answer) ? (
                  <FormGroup>
                    {questions[currentIndex].options.map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            checked={selectedOptions.includes(option)}
                            onChange={(e) => handleOptionChange(e, true)}
                            value={option}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                ) : (
                  <RadioGroup value={selectedOptions[0] || ""} onChange={(e) => handleOptionChange(e, false)}>
                    {questions[currentIndex].options.map((option, idx) => (
                      <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={selectedOptions.length === 0}
                  >
                    {currentIndex + 1 === questions.length ? "Finish" : "Save and Next"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
