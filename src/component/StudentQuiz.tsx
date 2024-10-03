// components/StudentQuiz.tsx
import { useState, useEffect, useContext } from "react";
import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { QuizContext } from "../context/QuizContext";

const StudentQuiz = () => {
  const { quizTitle, quizActive, timeLimit } = useContext(QuizContext);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Timer in seconds
  const [student, setStudent] = useState<string | null>(null); // Selected student

  useEffect(() => {
    if (quizActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [quizActive, timeLeft]);

  const handleSubmit = () => {
    alert("Quiz submitted");
  };

  const handleStudentSelection = (selectedStudent: string) => {
    setStudent(selectedStudent);
  };

  if (!quizActive) {
    return <Text>The quiz is not active.</Text>;
  }

  if (!student) {
    return (
      <Stack spacing={5} align="center" justify="center" height="100vh">
        <Text>Select Your Name:</Text>
        {["Student A", "Student B", "Student C"].map((studentName) => (
          <Button
            key={studentName}
            colorScheme="blue"
            onClick={() => handleStudentSelection(studentName)}
          >
            {studentName}
          </Button>
        ))}
      </Stack>
    );
  }

  return (
    <Stack spacing={5} align="center" justify="center" height="100vh">
      <Text>Welcome, {student}</Text>
      <Text>Quiz Title: {quizTitle}</Text>
      <Text>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</Text>

      {/* Questions and answer form go here */}

      <Button colorScheme="teal" onClick={handleSubmit}>
        Submit Answers
      </Button>
    </Stack>
  );
};

export default StudentQuiz;
