document.addEventListener("DOMContentLoaded", updateMaxRoundsPossible);
document.getElementById("start-quiz-button").addEventListener("click", startQuiz);
document.getElementById("yes-button").addEventListener("click", checkAnswer);
document.getElementById("no-button").addEventListener("click", checkAnswer);
// Define ingredients and diets
const ingredients = [
  { name: "an onion", diet: ["vegan", "vegetarian", "gluten-free", "keto"], address: "assets/images/onion.jpeg" },
  { name: "bread", diet: ["vegan", "vegetarian"], address: "assets/images/bread.jpeg" },
  { name: "milk", diet: ["vegetarian", "gluten-free"], address: "assets/images/milk.jpeg" },
  { name: "steak", diet: ["gluten-free", "keto"], address: "assets/images/steak.jpeg" },
];

const diets = ["vegan", "vegetarian", "gluten-free", "keto"];

let numberOfQuestions = 0;
let maxNumberOfQuestions;
let questionLog = [];
let currentQuestion;
let maxUniqueQuestions;

function startQuiz() {
  maxNumberOfQuestions = parseInt(document.getElementById("number-of-rounds").value, 10);
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

function incrementCorrectCount() {
  const correctCountElem = document.getElementById("correct-count");
  correctCountElem.innerText = parseInt(correctCountElem.innerText, 10) + 1;
}

function incrementIncorrectCount() {
  const incorrectCountElem = document.getElementById("incorrect-count");
  incorrectCountElem.innerText = parseInt(incorrectCountElem.innerText, 10) + 1;
}

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
  document
    .getElementById("restart-button")
    .addEventListener("click", startQuiz);
  document.getElementById("quiz-results").style.display = "none";
  document.getElementById("point-container").style.display = "none";
}
