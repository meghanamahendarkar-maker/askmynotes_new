import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  // Change this to your deployed backend URL when deployed
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

  const askQuestion = async () => {
    const cleanedQuestion = question.trim();
    if (!cleanedQuestion) {
      setError("Please enter a question.");
      setAnswer("");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const formData = new FormData();
      formData.append("question", cleanedQuestion);
      if (fileRef.current?.files[0]) {
        formData.append("file", fileRef.current.files[0]);
      }

      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>AskMyNotes</h1>
        <p>Ask questions about your notes</p>

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="question-input"
        />

        <input
          type="file"
          accept=".txt,.pdf"
          ref={fileRef}
          className="file-input"
        />

        <button onClick={askQuestion} disabled={loading}>
          {loading ? "Processing..." : "Ask"}
        </button>

        <div className="output">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Processing your notes...</p>
            </div>
          )}

          {!loading && error && (
            <div className="error">{error}</div>
          )}

          {!loading && answer && (
            <div className="answer">
              <strong>Answer:</strong>
              <br /><br />
              {answer}
            </div>
          )}

          {!loading && !answer && !error && (
            <div className="answer-placeholder">
              <strong>Answer:</strong>
              <br /><br />
              Answer will appear here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
