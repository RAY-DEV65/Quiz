import { useState } from "react";
import Welcome from "./components/welcome/Welcome";
import Quiz from "./components/quiz/Quiz";
import Certificate from "./components/certificate/Certificate";

const App = () => {
  const [started, setStarted] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  const handleStart = (name) => {
    setParticipantName(name);
    setStarted(true);
  };

  const handleQuizComplete = (result) => {
    setQuizResult(result);
  };

  const handleRestart = () => {
    setStarted(false);
    setParticipantName("");
    setQuizResult(null);
  };

  if (!started) {
    return <Welcome onStart={handleStart} />;
  }

  if (quizResult) {
    return (
      <Certificate
        name={participantName}
        score={quizResult.score}
        totalQuestions={quizResult.totalQuestions}
        percentage={quizResult.percentage}
        timeUp={quizResult.timeUp}
        onRestart={handleRestart}
      />
    );
  }

  return <Quiz onComplete={handleQuizComplete} />;
};

export default App;