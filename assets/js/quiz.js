/*jshint esversion: 6 */
// Define constants
const ingredients = [
  { name: "an onion", diet: ["vegan", "vegetarian", "gluten-free", "keto"], address: "assets/images/onion.jpeg" },
  { name: "bread", diet: ["vegan", "vegetarian"], address: "assets/images/bread.jpeg" },
  { name: "milk", diet: ["vegetarian", "gluten-free"], address: "assets/images/milk.jpeg" },
  { name: "steak", diet: ["gluten-free", "keto"], address: "assets/images/steak.jpeg" },
];
const diets = ["vegan", "vegetarian", "gluten-free", "keto"];

// Define variables
let numberOfQuestions = 0;
let maxNumberOfQuestions;
let questionLog = [];
let currentQuestion;
let maxUniqueQuestions;

// Add event listeners
/**
 * Event listener to the DOM content loaded event to update the maximum number of rounds possible
 */
document.addEventListener("DOMContentLoaded", updateMaxRoundsPossible);
/**
 * Event listener to the start quiz button to start the quiz, calling the function startQuiz
 */
document.getElementById("start-quiz-button").addEventListener("click", startQuiz);
/**
 * Event listener to the yes and no buttons to check the answer, calling the function checkAnswer
 */
document.getElementById("yes-button").addEventListener("click", checkAnswer);
/**
 * Event listener to the yes and no buttons to check the answer, calling the function checkAnswer
 */
document.getElementById("no-button").addEventListener("click", checkAnswer);

/**
 * 
 * function to start the quiz, setting the number of questions to 0 and the question log to an empty array, calling the function loadQuizQuestion
 */
function startQuiz() {
  maxNumberOfQuestions = parseInt(document.getElementById("number-of-rounds").value, 10);
  /**
   * Check if the number of questions is not a number or is less than 1. If it is, alert the user and return.
   */
  if (isNaN(maxNumberOfQuestions) || maxNumberOfQuestions < 1) {
    alert("Please enter a valid number of questions.");
    return;
  }

  numberOfQuestions = 0;
  questionLog = [];
  loadQuizQuestion();
  
  document.getElementById("quiz-results").style.display = "flex";
  document.getElementById("point-container").style.display = "flex";
  document.getElementById("point-container").style.justifyContent = "center";
}

/**
 * function to update the maximum number of rounds possible based on the number of ingredients and diets
 */
function updateMaxRoundsPossible() {
  const maxRoundsInput = document.getElementById("number-of-rounds");
  maxRoundsInput.max = ingredients.length * diets.length;
}

function loadQuizQuestion() {
  const contentContainer = document.getElementById("content-container");
  const questionContainer = document.getElementById("question-container");

  // Clear previous content
  contentContainer.innerHTML = "";
  questionContainer.innerHTML = "";

  maxUniqueQuestions = ingredients.length * diets.length;

  let randomIngredient, randomDiet, isDuplicate;
/**
 * Loop to generate a random ingredient and diet until a unique question is created and avoid duplicated questions.
 */
  do {
    if (questionLog.length >= maxUniqueQuestions) {
      endQuiz();
      return;
    }

    randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    randomDiet = diets[Math.floor(Math.random() * diets.length)];
    isDuplicate = questionLog.some(q => q.ingredient.name === randomIngredient.name && q.diet === randomDiet);
  } while (isDuplicate);

  const img = document.createElement("img");
  img.src = randomIngredient.address;
  img.alt = randomIngredient.name;
  img.classList.add("quiz-image");
  contentContainer.appendChild(img);

  questionContainer.innerHTML = `<h3>Is <span id="random-ingredient">${randomIngredient.name}</span> <span id="random-diet">${randomDiet}</span>?</h3>`;

  currentQuestion = { ingredient: randomIngredient, diet: randomDiet };
  numberOfQuestions++;
  questionLog.push(currentQuestion);
}
/**
 * 
 * @param {Event} event 
 * function to check the Answers, if the number of questions exceeds the maximum, avoid any action.
 * Check if the user's answer is correct and increment the correct or incorrect count accordingly.
 * If the number of questions is less than the maximum, call the function loadQuizQuestion.
 * If the answer is correct, calls the incremenet correct count function.
 * If the answer is incorrect, calls the increment incorrect function.
 * @returns 
 */
function checkAnswer(event) {
  if (numberOfQuestions > maxNumberOfQuestions) {
    // Avoid any action if the number of questions exceeds the maximum
    return;
  }

  const userAnswer = event.target.id === "yes-button";
  const correctStatement = currentQuestion.ingredient.diet.includes(currentQuestion.diet);

  if (userAnswer === correctStatement) {
    incrementCorrectCount();
  } else {
    incrementIncorrectCount();
  }

  if (numberOfQuestions < maxNumberOfQuestions) {
    loadQuizQuestion();
  } else {
    endQuiz();
  }
}
/**
 * Defines a function to increment the correct count by 1.
 */
function incrementCorrectCount() {
  const correctCountElem = document.getElementById("correct-count");
  correctCountElem.innerText = parseInt(correctCountElem.innerText, 10) + 1;
}
/**
 * Defines a function to increment the incorrect count by 1.
 */
function incrementIncorrectCount() {
  const incorrectCountElem = document.getElementById("incorrect-count");
  incorrectCountElem.innerText = parseInt(incorrectCountElem.innerText, 10) + 1;
}
/**
 * Defines a function to end the quiz.
 * Clear the content container and question container.
 * Display the user's score.
 * Display a restart button.
 * Set the number of questions to 0.
 * Set the correct count to 0.
 * Set the incorrect count to 0.
 * Add an event listener to the restart button to call the startQuiz function.
 * Hide the quiz results and point container.
 */
function endQuiz() {
  let contentContainer = document.getElementById("content-container");
  let questionContainer = document.getElementById("question-container");
  contentContainer.innerHTML = "";
  questionContainer.innerHTML = "";
  contentContainer.innerHTML = `<h3>Quiz ended! You got ${document.getElementById("correct-count").innerText} out of ${numberOfQuestions} correct!</h3>`;
  questionContainer.innerHTML = `<button id="restart-button" class="button-large">Restart Quiz</button>`;
  numberOfQuestions = 0;
  document.getElementById("correct-count").innerText = 0;
  document.getElementById("incorrect-count").innerText = 0;
  document.getElementById("restart-button")
  .addEventListener("click", startQuiz);
  document.getElementById("quiz-results").style.display = "none";
  document.getElementById("point-container").style.display = "none";
}
