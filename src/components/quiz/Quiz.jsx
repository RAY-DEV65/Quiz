import { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = ({ onComplete }) => {
  const TOTAL_TIME = 1 * 60;

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const scoreRef = useRef(0);
  const submittedRef = useRef(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [
    Option1,
    Option2,
    Option3,
    Option4,
  ];

  /* =====================================================
     KEEP SCORE REF UPDATED
  ===================================================== */

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);


  /* =====================================================
     SUBMIT QUIZ
  ===================================================== */

  const submitQuiz = (timeUp = false) => {
    if (submittedRef.current) return;

    submittedRef.current = true;

    const finalScore = scoreRef.current;

    onComplete({
      score: finalScore,
      totalQuestions: data.length,
      percentage: Math.round(
        (finalScore / data.length) * 100
      ),
      timeUp,
    });
  };


  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);

          submitQuiz(true);

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  /* =====================================================
     FORMAT TIMER
  ===================================================== */

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;


  /* =====================================================
     TIMER COLOR
  ===================================================== */

  const timerClass =
    timeLeft <= 60
      ? "timer danger"
      : timeLeft <= 300
      ? "timer warning"
      : "timer";


  /* =====================================================
     CHECK ANSWER
  ===================================================== */

  const checkAnswer = (e, answer) => {
    if (lock || submittedRef.current) return;

    if (question.answer === answer) {
      e.currentTarget.classList.add("correct");

      setLock(true);

      const newScore = scoreRef.current + 1;

      scoreRef.current = newScore;

      setScore(newScore);
    } else {
      e.currentTarget.classList.add("wrong");

      setLock(true);

      const correctOption =
        option_array[question.answer - 1];

      if (correctOption.current) {
        correctOption.current.classList.add("correct");
      }
    }
  };


  /* =====================================================
     NEXT QUESTION
  ===================================================== */

  const next = () => {
    if (!lock || submittedRef.current) return;

    /* LAST QUESTION */

    if (index === data.length - 1) {
      submitQuiz(false);
      return;
    }

    /* NEXT QUESTION */

    const nextIndex = index + 1;

    setIndex(nextIndex);
    setQuestion(data[nextIndex]);
    setLock(false);

    /* REMOVE OLD ANSWER COLORS */

    option_array.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      }
    });
  };


  /* =====================================================
     JSX
  ===================================================== */

  return (
    <div className="quiz-page">

      <div className="quiz-container">

        {/* HEADER */}

        <div className="quiz-header">

          <div className="quiz-heading">

            <p className="quiz-label">
              UI'26 APW
            </p>

            <h1>
              Quiz App
            </h1>

          </div>


          {/* TIMER */}

          <div className={timerClass}>

            <span className="timer-label">
              TIME LEFT
            </span>

            <strong>
              {formattedTime}
            </strong>

          </div>

        </div>


        {/* DIVIDER */}

        <hr />


        {/* QUESTION */}

        <div className="question-section">

          <p className="question-number">
            QUESTION {index + 1} OF {data.length}
          </p>

          <h2>
            {question.question}
          </h2>

        </div>


        {/* OPTIONS */}

        <ul className="options">

          <li
            ref={Option1}
            onClick={(e) => checkAnswer(e, 1)}
          >
            <span className="option-number">
              A
            </span>

            <span className="option-text">
              {question.option1}
            </span>
          </li>


          <li
            ref={Option2}
            onClick={(e) => checkAnswer(e, 2)}
          >
            <span className="option-number">
              B
            </span>

            <span className="option-text">
              {question.option2}
            </span>
          </li>


          <li
            ref={Option3}
            onClick={(e) => checkAnswer(e, 3)}
          >
            <span className="option-number">
              C
            </span>

            <span className="option-text">
              {question.option3}
            </span>
          </li>


          <li
            ref={Option4}
            onClick={(e) => checkAnswer(e, 4)}
          >
            <span className="option-number">
              D
            </span>

            <span className="option-text">
              {question.option4}
            </span>
          </li>

        </ul>


        {/* NEXT BUTTON */}

        <button
          className={`next-button ${
            !lock ? "disabled" : ""
          }`}
          onClick={next}
          disabled={!lock}
        >
          {index === data.length - 1
            ? "Submit Quiz"
            : "Next Question"}

          <span>
            →
          </span>
        </button>


        {/* PROGRESS */}

        <div className="quiz-progress">

          <div className="progress-text">

            <span>
              Progress
            </span>

            <span>
              {index + 1}/{data.length}
            </span>

          </div>


          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${
                  ((index + 1) / data.length) * 100
                }%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Quiz;