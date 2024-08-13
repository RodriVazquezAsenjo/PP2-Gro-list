document.getElementById("start-quiz-button").addEventListener("click", startQuiz);

let numberOfQuestions = 0;
let maxNumberOfQuestions;
let questionLog = [];
let currentQuestion;
let maxUniqueQuestions;

function startQuiz() {
    maxNumberOfQuestions = document.getElementById("number-of-rounds").value;
    numberOfQuestions = 0;
    questionLog = [];
    loadQuizQuestion();
}

function loadQuizQuestion() {
    // Get container elements
    const contentContainer = document.getElementById("content-container");
    const questionContainer = document.getElementById("question-container");

    // Clear previous content
    contentContainer.innerHTML = "";
    questionContainer.innerHTML = "";

    // Define ingredients and diets
    const ingredients = [
        { name: "an onion", diet: ["vegan", "vegetarian", "gluten-free", "keto"], address: "assets/images/onion.jpeg" },
        { name: "bread", diet: ["vegan", "vegetarian"], address: "assets/images/bread.jpeg" },
        { name: "milk", diet: ["vegetarian", "gluten-free"], address: "assets/images/milk.jpeg" },
        { name: "steak", diet: ["gluten-free", "keto"], address: "assets/images/steak.jpeg" }
    ];

    const diets = ["vegan", "vegetarian", "gluten-free", "keto"];

    maxUniqueQuestions = ingredients.length * diets.length;

    // Get a random ingredient and diet
    let randomIngredient;
    let randomDiet;
    let isDuplicate;


    do {
        // Avoid infinite loop
        if (questionLog.length >= maxUniqueQuestions) {
            endQuiz();
            return;
        }
        randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
        randomDiet = diets[Math.floor(Math.random() * diets.length)];
        isDuplicate = questionLog.some(q=>q.ingredient.name === randomIngredient.name && q.diet === randomDiet);
    }
    while(isDuplicate);

    // Create and append image element
    const img = document.createElement("img");
    img.src = randomIngredient.address;
    img.alt = randomIngredient.name;
    img.classList.add("quiz-image");
    contentContainer.appendChild(img);

    // Create and set question content
    questionContainer.innerHTML = `<h3>Is <span id="random-ingredient">${randomIngredient.name}</span> <span id="random-diet">${randomDiet}</span>?</h3>`;

    currentQuestion = {
        ingredient: randomIngredient,
        diet: randomDiet
    };
    numberOfQuestions++;
    questionLog.push(currentQuestion);
}
document.getElementById("yes-button").addEventListener("click", checkAnswer);
document.getElementById("no-button").addEventListener("click", checkAnswer);
function checkAnswer (event) {
    // Check if the answer is yes or no.
    let userAnswer = event.target.id === "yes-button" ? true : false;
    //set the true statement
    let correctStatement = currentQuestion.ingredient.diet.includes(currentQuestion.diet);
    //if the user answer and the statement have the same truthiness
    if (userAnswer && correctStatement) {
        incrementCorrectCount();
    } 
    // if the user answer and the statement do not have the same truthiness
    else {
        incrementIncorrectCount();
    }
    //add a new question
    if (numberOfQuestions <= maxNumberOfQuestions) {
        loadQuizQuestion();
    } else {
        endQuiz();
    }
}
function incrementCorrectCount () {
    let oldScore = parseInt(document.getElementById("correct-count").innerText);
    document.getElementById("correct-count").innerText = ++oldScore
}

function incrementIncorrectCount () {
    let oldScore = parseInt(document.getElementById("incorrect-count").innerText);
    document.getElementById("incorrect-count").innerText = ++oldScore
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
    document.getElementById("restart-button").addEventListener("click", startQuiz);
}