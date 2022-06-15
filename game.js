const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// GO BACK AND MAKE BETTER QUESTIONS WHEN YOUR DONE THE ACTUAL WEBSITE
let questions = [
  {
    question: "What year did the search engine Archie release?",
    choice1: "1987",
    choice2: "1992",
    choice3: "1990",
    choice4: "1995",
    answer: 3,
  },
  {
    question: "Who created Java",
    choice1: "James Gosling",
    choice2: "Research in Motion",
    choice3: "Reginald Fessenden",
    choice4: "Donald Lewes Hings",
    answer: 1,
  },
  {
    question:
      "Who was BlackBerrys closest competitor in the category of mobile e-mail devices in 1999",
    choice1: "Apple",
    choice2: "Archie",
    choice3: "Google",
    choice4: "Palm VII PDA",
    answer: 4,
  },
  {
    question:
      "What type of Walkie Talkie was especially popular in World War II",
    choice1: "Model C-58 Pack Set",
    choice2: "The Motorola SCR-300",
    choice3: "Arcshell Rechargeable Long Range Two-Way Radios",
    choice4: "SCR-536",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
