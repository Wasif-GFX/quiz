const questions = [
  {
    question: "HTML Stands for",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique",
    option1: "id",
    option2: "class",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

// Variables for the quiz
let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById('ques');
const option1Label = document.getElementById('opt1');
const option2Label = document.getElementById('opt2');
const option3Label = document.getElementById('opt3');
const nextButton = document.getElementById('btn');
const timerElement = document.getElementById('timer');

let timeRemaining = 120; // 2 minutes in seconds
let timerInterval;

// Function to start the timer
function startTimer() {
  clearInterval(timerInterval); // Stop any existing timer interval
  timeRemaining = 120; // Reset the timer for each question (e.g., 2 minutes)

  timerInterval = setInterval(function () {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    if (seconds < 10) seconds = "0" + seconds;

    timerElement.textContent = `${minutes}:${seconds}`;
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval); // Stop timer when time is up
      nextQuestion(); // Automatically move to the next question when time runs out
    }
  }, 1000); // Update every second
}

// Function to load the current question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  option1Label.textContent = currentQuestion.option1;
  option2Label.textContent = currentQuestion.option2;
  option3Label.textContent = currentQuestion.option3;

  startTimer(); // Start a new timer for the question
}

// Function to move to the next question
function nextQuestion() {
  // Validate selected answer
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const answer = selectedOption.nextElementSibling.textContent;
    if (answer === questions[currentQuestionIndex].corrAnswer) {
      score++; // Increment score for correct answer
    }
    selectedOption.checked = false; // Clear selection
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion(); // Load the next question
    nextButton.disabled = true; // Disable Next button until new option is selected
  } else {
    endQuiz(); // End the quiz when all questions are answered
  }
}

// Enable Next button when an option is selected
function clicked() {
  nextButton.disabled = false;
}

// Function to end the quiz when time runs out or quiz ends
function endQuiz() {
  clearInterval(timerInterval); // Stop the timer when quiz ends

  const percentage = (score / questions.length) * 100;
  let remark = "";

  if (percentage >= 80) {
    remark = "Excellent";
  } else if (percentage >= 60) {
    remark = "Very Good";
  } else if (percentage >= 40) {
    remark = "Good";
  } else {
    remark = "Failed";
  }

  // Create and display custom popup
  const popup = document.createElement("div");
  popup.classList.add("custom-popup");
  popup.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score: ${score}/${questions.length} (${percentage.toFixed(2)}%)</p>
    <p>Remark: <strong>${remark}</strong></p>
    <button onclick="closePopup()">OK</button>
  `;
  document.body.appendChild(popup);
}

// Function to close the custom popup
function closePopup() {
  const popup = document.querySelector(".custom-popup");
  if (popup) {
    popup.remove();
  }
}

// Load the first question when the page loads
window.onload = function() {
  loadQuestion(); // Load first question
};
