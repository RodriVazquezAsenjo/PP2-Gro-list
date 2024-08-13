document.getElementById("start-quiz-button").addEventListener("click", loadQuizQuestion);

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

    // Get a random ingredient and diet
    let randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    let randomDiet = diets[Math.floor(Math.random() * diets.length)];

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
}
document.getElementById("yes-button").addEventListener("click", checkAnswer);
document.getElementById("no-button").addEventListener("click", checkAnswer);
function checkAnswer (event) {
    let userAnswer = event.target.id === "yes-button" ? true : false;
    let correctStatement = currentQuestion.ingredient.diet.includes(currentQuestion.diet);
    if (userAnswer && correctStatement) {
        incrementCorrectCount();
    } else {
        incrementIncorrectCount();
    }
    loadQuizQuestion();
}
function incrementCorrectCount () {
    let oldScore = parseInt(document.getElementById("correct-count").innerText);
    document.getElementById("correct-count").innerText = ++oldScore
}

function incrementIncorrectCount () {
    let oldScore = parseInt(document.getElementById("incorrect-count").innerText);
    document.getElementById("incorrect-count").innerText = ++oldScore
}