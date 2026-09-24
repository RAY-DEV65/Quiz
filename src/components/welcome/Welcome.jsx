import { useState } from "react";
import "./Welcome.css";

const Welcome = ({ onStart }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name before starting.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    setError("");
    onStart(trimmedName);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-circle circle-one"></div>
      <div className="welcome-circle circle-two"></div>
      <div className="welcome-circle circle-three"></div>

      <div className="welcome-content">
        <p className="welcome-small">WELCOME TO</p>

        <h1 className="welcome-title">
          <span>UI'26</span>
          <span>APW</span>
        </h1>

        <div className="welcome-line"></div>

        <p className="welcome-description">
          Get ready to test your knowledge, challenge yourself,
          and see how well you can perform.
        </p>

        <form onSubmit={handleSubmit} className="welcome-form">
          <label htmlFor="participant-name">
            Participant Name
          </label>

          <input
            id="participant-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            autoComplete="name"
          />

          {error && (
            <p className="name-error">
              {error}
            </p>
          )}

          <div className="quiz-info">
            <div className="info-item">
              <span className="info-number">50</span>
              <span className="info-label">Questions</span>
            </div>

            <div className="info-divider"></div>

            <div className="info-item">
              <span className="info-number">40</span>
              <span className="info-label">Minutes</span>
            </div>
          </div>

          <button
            type="submit"
            className="start-button"
          >
            <span>Start Quiz</span>
            <span className="button-arrow">→</span>
          </button>
        </form>

        <p className="welcome-note">
          Read each question carefully and choose the correct answer.
        </p>
      </div>
    </div>
  );
};

export default Welcome;