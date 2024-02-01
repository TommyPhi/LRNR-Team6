import React, { useRef, useState } from "react";
// import '../index.css';
import Question from "./Question";
import { Oval } from 'react-loader-spinner'
import "../App.css";

export default function QuizForm() {
  const topic = useRef(null);
  const expertise = useRef(null);
  const numquestions = useRef(null);
  const questionstyle = useRef(null);
  const quizGenerateForm = useRef(null);
  const questionContainer = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentStyle, setCurrentStyle] = useState("none");
  const [questionStyle, setQuestionStyle] = useState("normal");

  async function handleGenerateQuiz() {
    const quizOptions = {
      topic: topic.current.value,
      expertise: expertise.current.value,
      numquestions: numquestions.current.value,
      questionstyle: questionstyle.current.value,
    };
    questionContainer.current.style.display = "block";
    quizGenerateForm.current.style.display = "none";

    const url =
      "http://localhost:4000/api/generateQuiz?" +
      "topic=" +
      quizOptions.topic +
      "&expertise=" +
      quizOptions.expertise +
      "&questionNum=" +
      quizOptions.numquestions +
      "&questionStyle=" +
      quizOptions.questionstyle;
    await fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result);
        setQuestionStyle(quizOptions.questionstyle);
        setCurrentStyle("block");
      })
      .catch((error) => console.log("error", error));
  }

  function handleNextQuestion() {
    if (currentQuestion === questions.length - 1) {
      window.location.href = "/results";
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    console.log(currentQuestion);
  }

  return (
    <div className="container">
      <div ref={quizGenerateForm} className="section">
        <div className="row">
          <div className="col">
            <h3 className="mb-4">Quiz Generation Options</h3>
          </div>
        </div>
        <div className="row">
          <div className="col mb-4">
            Please choose your preferences below to generate your personalized
            quiz
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="topic" className="form-label">
              Topic
            </label>
            <select ref={topic} className="form-select" id="topic">
              <option value="" disabled selected></option>
              <option value="golang">golang</option>
              <option value="aws">aws</option>
              <option value="javascript">javascript</option>
              <option value="ci/cd">CI/CD</option>
              <option value="growing you own garden">home gardens</option>
              <option value="coffee">coffee</option>
              <option value="finger food">finger foods</option>
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="expertise" className="form-label">
              Expertise
            </label>
            <select ref={expertise} className="form-select" id="expertise">
              <option value="" disabled selected></option>
              <option value="novice">novice</option>
              <option value="intermediate">intermediate</option>
              <option value="expert">expert</option>
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="numquestions" className="form-label">
              Number of questions
            </label>
            <select
              ref={numquestions}
              className="form-select"
              id="numquestions"
            >
              <option value="" disabled></option>
              <option value="5" selected>
                5
              </option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="questionstyle" className="form-label">
              Style of questions
            </label>
            <select
              ref={questionstyle}
              className="form-select"
              id="questionstyle"
            >
              <option value="" disabled></option>
              <option value="master oogway">master oogway</option>
              <option value="1940's gangster">1940's gangster</option>
              <option value="like i'm an 8 year old">
                like I'm an 8 year old
              </option>
              <option value="normal" selected>
                normal
              </option>
              <option value="master yoda">jedi</option>
              <option value="captain jack sparrow">captain jack sparrow</option>
              <option value="matthew mcconaughey">matthew mcconaughey</option>
            </select>
          </div>
          <div className="col-12">
            <button
              id="btn-categories"
              className="btn btn-primary btn-custom"
              onClick={() => handleGenerateQuiz()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div ref={questionContainer} style={{ display: "none" }}>
        {!questions.length ? (
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#5161ce"
            secondaryColor="#2d45e2"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <Question
            key={currentQuestion}
            question={questions[currentQuestion]}
            handleNextQuestion={handleNextQuestion}
            eStyle={currentStyle}
            questionStyle={questionStyle}
            questionNum={currentQuestion + 1}
          />
        )}
      </div>
    </div>
  );
}
