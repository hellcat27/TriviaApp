import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import Select from "react-select";
import "./App.css";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      correct_answer: "",
      incorrect_answers: [],
      numberOfQuestions: 1,
      selectedCategory: categoryOptions[0],
    };
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  checkAnswer(answer) {
    if (answer === this.state.correct_answer) {
      console.log(answer);
      alert("Correct!");
    } else {
      console.log(answer);
      alert(
        "Incorrect! The correct answer is " + this.state.correct_answer
      );
    }
  }

  renderQuestion() {
    //console.log(this.state.question);
    //console.log(this.state.correct_answer);
    let possibleAnswers = [];
    possibleAnswers = possibleAnswers.concat(this.state.incorrect_answers);
    possibleAnswers.push(this.state.correct_answer);
    //console.log("Preshuffle: " + possibleAnswers);
    this.shuffleArray(possibleAnswers);
    //console.log("Postshuffle: " + possibleAnswers);
    return (
      <div>
        <p class="question">{this.state.question}</p>
        {possibleAnswers.map(answer => (
          <div>
            <button key={answer} onClick={() => this.checkAnswer(answer)}>
              {answer}
            </button>
          </div>
        ))}
      </div>
    );
  }

  handleCategoryChange = selectedOption => {
    this.setState({ selectedCategory: selectedOption });
    console.log("Option selected: " + selectedOption.value);
  };

  newQuestion = () => {
    axios
      .get(
        `http://localhost:8080/api/trivia/randomquestions?numberOfQuestions=${this.state.numberOfQuestions}&category=${this.state.selectedCategory.value}`
      )
      .then(res => {
        //console.log(res);
        this.setState(
          {
            question: res.data.results[0].question,
            correct_answer: res.data.results[0].correct_answer,
            incorrect_answers: res.data.results[0].incorrect_answers
          },
          () => {
            //console.log(this.state.incorrect_answers);
          }
        );
        //console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/trivia/randomquestions?numberOfQuestions=${this.state.numberOfQuestions}&type=${this.state.selectedCategory}`
      )
      .then(res => {
        //console.log(res);
        this.setState(
          {
            question: res.data.results[0].question,
            correct_answer: res.data.results[0].correct_answer,
            incorrect_answers: res.data.results[0].incorrect_answers
          },
          () => {
            // console.log(this.state.incorrect_answers);
          }
        );
        //console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { selectedCategory } = this.state.selectedCategory;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
            <button onClick={this.newQuestion}>New Question</button>
          </div>
          <div>{this.renderQuestion()}</div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
