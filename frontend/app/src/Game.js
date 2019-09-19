import React from "react";
import axios from "axios";
import Select from "react-select";
import "./Game.css";
import Scoretable from "./Scoretable";

const categoryOptions = [
  { value: "", label: "Any Category" },
  { value: "9", label: "General Knowledge" },
  { value: "10", label: "Entertainment: Books" },
  { value: "11", label: "Entertainment: Film" },
  { value: "12", label: "Entertainment: Music" },
  { value: "13", label: "Entertainment: Musicals & Theaters" },
  { value: "14", label: "Entertainment: Television" },
  { value: "15", label: "Entertainment: Video Games" },
  { value: "16", label: "Entertainment: Board Games" },
  { value: "17", label: "Science and Nature" },
  { value: "18", label: "Science: Computers" },
  { value: "20", label: "Mythology" },
  { value: "21", label: "Sports" },
  { value: "22", label: "Geography" },
  { value: "23", label: "History" },
  { value: "24", label: "Politics" },
  { value: "25", label: "Art" },
  { value: "26", label: "Celebrities" },
  { value: "27", label: "Animals" },
  { value: "28", label: "Vehicles" },
  { value: "29", label: "Entertainment: Comics" },
  { value: "30", label: "Science: Gadgets" },
  { value: "31", label: "Entertainment: Japanese Anime & Manga" },
  { value: "32", label: "Entertainment: Cartoons & Animations" }
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      correct_answer: "",
      incorrect_answers: [],
      possibleAnswers: [],
      numberOfQuestions: 1,
      questionCorrectStreak: 0,
      selectedCategory: categoryOptions[0],
      score: 0,
      questionAnswered: true,
      numberOfQuestionsAnswered: 1,
      questionLimit: 15,
      gameOver: false,
      feedback: "",
      gameoverFeedback: "",
      name: ""
    };

    this.handleSubmitScore = this.handleSubmitScore.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  gameOver = () => {
    this.setState({ gameOver: true });
    this.setState({
      gameoverFeedback: "Game Over. Your final score is: " + this.state.score
    });
  };

  newGame = () => {
    this.setState({
      gameOver: false,
      numberOfQuestionsAnswered: 1,
      score: 0,
      questionCorrectStreak: 0,
      question: "",
      answer: "",
      incorrect_answers: [],
      possibleAnswers: [],
      questionAnswered: true,
      feedback: "",
      gameoverFeedback: ""
    });
  };

  checkForGameOver() {
    if (this.state.numberOfQuestionsAnswered === this.state.questionLimit) {
      this.gameOver();
    } else {
      this.setState({
        numberOfQuestionsAnswered: this.state.numberOfQuestionsAnswered + 1
      });
    }
  }

  checkAnswer(answer) {
    this.setState({ questionAnswered: true });
    if (answer === this.state.correct_answer) {
      this.setState({ questionAnswered: true });
      console.log(answer);
      this.setState({
        questionCorrectStreak: this.state.questionCorrectStreak + 1
      });
      this.setState({ feedback: "Correct!" });
      this.setState(
        {
          score: this.state.score + 5 + this.state.questionCorrectStreak * 5
        },
        () => {
          this.checkForGameOver();
        }
      );
    } else {
      this.setState({ questionAnswered: true });
      console.log(answer);
      console.log(this.state.score);
      this.setState({ questionCorrectStreak: 0 });
      this.setState(
        {
          feedback:
            "Incorrect! The correct answer is " + this.state.correct_answer + "."
        },
        () => {
          this.checkForGameOver();
        }
      );
    }
  }

  renderQuestionCount() {
    if (this.state.question !== "") {
      return (
        <div>
          <p>
            Question: {this.state.numberOfQuestionsAnswered}/
            {this.state.questionLimit}
          </p>
        </div>
      );
    }
  }

  renderQuestion() {
    if (this.state.question !== "") {
      return (
        <div>
          <p className="question">{this.state.question}</p>
        </div>
      );
    }
  }

  renderAnswers() {
    if (!this.state.questionAnswered) {
      return (
        <div>
          {this.state.possibleAnswers.map(answer => (
            <button
              className="answer"
              key={answer}
              onClick={() => this.checkAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      );
    }
  }

  renderScore() {
    return <div>Score: {this.state.score}</div>;
  }

  renderFeedback() {
    return <div>{this.state.feedback}</div>;
  }

  renderGameoverFeedback() {
    return <div>{this.state.gameoverFeedback}</div>;
  }

  renderPlayerScoreEntry() {
    if (this.state.gameOver) {
      return (
        <div>
          <form onSubmit={this.handleSubmitScore}>
            <label>
              Enter your name for the high score list:
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmitScore(event) {
    axios.post(`http://localhost:8080/api/trivia/newscore`, {
      name: this.state.name,
      score: this.state.score,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleCategoryChange = selectedOption => {
    this.setState({ selectedCategory: selectedOption });
    console.log("Option selected: " + selectedOption.value);
  };

  newQuestion = () => {
    this.setState({ questionAnswered: false, feedback: "" });
    axios
      .get(
        `http://localhost:8080/api/trivia/randomquestions?numberOfQuestions=${this.state.numberOfQuestions}&category=${this.state.selectedCategory.value}`
      )
      .then(res => {
        //console.log(res);
        let possibleAnswers = [];
        this.setState(
          {
            questionAnswered: false,
            question: res.data.results[0].question,
            correct_answer: res.data.results[0].correct_answer,
            incorrect_answers: res.data.results[0].incorrect_answers
          },
          () => {
            possibleAnswers = possibleAnswers.concat(
              this.state.incorrect_answers
            );
            possibleAnswers.push(this.state.correct_answer);
            this.shuffleArray(possibleAnswers);
          }
        );
        this.setState({ possibleAnswers: possibleAnswers });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { selectedCategory } = this.state.selectedCategory;
    return (
      <div>
        <div>
          <Select
            className="Dropdownselector"
            value={selectedCategory}
            onChange={this.handleCategoryChange}
            options={categoryOptions}
            placeholder="Any Category"
          />
        </div>
        <div>
          <button
            onClick={this.newQuestion}
            disabled={this.state.gameOver || !this.state.questionAnswered}
          >
            New Question
          </button>
          <button onClick={this.newGame}>New Game</button>
          <Scoretable />
        </div>
        <div>{this.renderScore()}</div>
        <div>{this.renderQuestionCount()}</div>
        <div>{this.renderQuestion()}</div>
        <div>{this.renderFeedback()}</div>
        <div>{this.renderAnswers()}</div>
        <div>{this.renderGameoverFeedback()}</div>
        <div>{this.renderPlayerScoreEntry()}</div>
      </div>
    );
  }
}

export default Game;
