document.addEventListener("DOMContentLoaded", () => {
    quizSetUp();

    const ingredientForm = document.getElementById("ingredient-form");
    if (ingredientForm) {
        ingredientForm.addEventListener("submit", addIngredients, false);
    }

    const listSelection = document.getElementById("list-selection");
    if (listSelection) {
        listSelection.addEventListener("submit", addPreList, false);
    }
});

function openNav() {
    const nav = document.getElementById("nav-bar");
    if (nav.style.height === "80px") {
        nav.style.height = "0";
        nav.style.visibility = "hidden";
    } else {
        nav.style.height = "80px";
        nav.style.visibility = "visible";
    }
}

function closeWindow() {
    const ingredientForm = document.getElementById("form-container");
    if (ingredientForm.classList.contains("visible")) {
        ingredientForm.classList.remove("visible");
        ingredientForm.style.opacity = "0";
    } else {
        ingredientForm.classList.add("visible");
        ingredientForm.style.opacity = "1";
    }
}

function addIngredients(event) {
    event.preventDefault();

    const ingredient = document.getElementById("add-ingredient-text").value;
    const quantity = document.getElementById("add-ingredient-quantity").value;
    const category = document.getElementById("add-ingredient-category").value;
    const date = document.getElementById("add-ingredient-date").value;

    const pantryItem = document.createElement("div");
    pantryItem.className = "pantry-item";
    pantryItem.innerHTML = `
        <div class="counter-container">
            <p class="button-close-pantry-item" onclick="deleteItem(this)">+</p>
            <h3 class="pantry-title">${ingredient}</h3>
        </div>
        <div class="pantry-text">
            <span class="ingredient-quantity">
                <button class="quantity-button add-quantity" onclick="changeQuantity(this, 1)">+</button>
                <p class="quantity-number">${quantity}</p>
                <button class="quantity-button substract-quantity" onclick="changeQuantity(this, -1)">-</button>
            </span>
            <div>
                <p class="sub-pantry-text">${category}</p>
                <p class="sub-pantry-text">${date}</p>
            </div>
        </div>`;

    const border = pantryItem.querySelector(".pantry-text");
    const quantityValue = parseInt(quantity, 10);
    if (quantityValue === 1) {
        border.style.borderTop = "3px solid red";
    } else if (quantityValue <= 3) {
        border.style.borderTop = "3px solid orange";
    } else {
        border.style.borderTop = "3px solid green";
    }

    document.getElementById("pantry-list").appendChild(pantryItem);
    closeWindow(); // Close the form after adding the ingredient
}

function changeQuantity(button, amount) {
    const counter = button.parentElement.querySelector(".quantity-number");
    const border = button.closest(".pantry-text");
    let currentValue = parseInt(counter.textContent, 10);
    currentValue += amount;
    if (currentValue < 0) {currentValue = 0;} // Prevent negative quantity
    counter.textContent = currentValue;

    if (currentValue <= 1) {border.style.borderTop = "3px solid red";}
    else if (currentValue <= 3) {border.style.borderTop = "3px solid orange";}
    else {border.style.borderTop = "3px solid green";}
}

function deleteItem(button) {
    const pantryItem = button.closest(".pantry-item");
    pantryItem.remove();
}

function addRow() {
    const tbody = document.getElementById("table-body");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" class="grocery-list-entry" aria-label="Ingredient entry"></td>
        <td><input type="number" class="grocery-list-entry" aria-label="Quantity entry"></td>
        <td><input type="checkbox" class="grocery-list-entry" aria-label="Bought checkbox"></td>
    `;
    tbody.appendChild(newRow);
}

function removeRow() {
    const tbody = document.getElementById("table-body");
    const lastRow = tbody.lastElementChild;

    if (lastRow) { // Check if there is at least one row to remove
        tbody.removeChild(lastRow);
    }
}

function addPreList(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Define the lists
    const basicGroceryList = [
        "Milk", "Eggs", "Bread", "Butter", "Apples", "Bananas", "Chicken breasts",
        "Rice", "Pasta", "Tomato sauce", "Coffee", "Sugar", "Salt", "Pepper"
    ];

    const veganGroceryList = [
        "Almond milk (or other plant-based milk)", "Tofu", "Tempeh", "Lentils",
        "Chickpeas", "Black beans", "Quinoa", "Brown rice", "Oats", "Whole grain bread",
        "Fresh fruits (e.g., apples, bananas, berries)", "Fresh vegetables (e.g., spinach, broccoli, carrots)",
        "Avocados", "Nuts (e.g., almonds, walnuts)", "Seeds (e.g., chia seeds, flaxseeds)",
        "Olive oil", "Nutritional yeast", "Soy sauce", "Tomato sauce", "Herbs and spices (e.g., garlic, turmeric, cumin)",
        "Vegan yogurt"
    ];

    const vegetarianGroceryList = [
        "Milk", "Cheese", "Yogurt", "Eggs", "Tofu", "Lentils", "Chickpeas",
        "Black beans", "Quinoa", "Brown rice", "Oats", "Whole grain bread",
        "Fresh fruits (e.g., apples, bananas, berries)", "Fresh vegetables (e.g., spinach, broccoli, carrots)",
        "Avocados", "Nuts (e.g., almonds, walnuts)", "Seeds (e.g., chia seeds, flaxseeds)",
        "Olive oil", "Nutritional yeast", "Tomato sauce", "Herbs and spices (e.g., garlic, turmeric, cumin)",
        "Vegetarian pasta"
    ];

    const glutenFreeGroceryList = [
        "Gluten-free bread", "Gluten-free pasta", "Quinoa", "Rice", "Potatoes",
        "Fresh fruits (e.g., apples, bananas, berries)", "Fresh vegetables (e.g., spinach, broccoli, carrots)",
        "Chicken breasts", "Fish", "Eggs", "Nuts (e.g., almonds, walnuts)", "Seeds (e.g., chia seeds, flaxseeds)",
        "Olive oil", "Gluten-free soy sauce", "Gluten-free oats", "Canned beans (ensure they are gluten-free)",
        "Gluten-free baking flour", "Yogurt (check for gluten-free labeling)", "Cheese",
        "Herbs and spices (e.g., garlic, turmeric, cumin)"
    ];

    const ketoGroceryList = [
        "Avocados", "Eggs", "Chicken breasts", "Beef", "Salmon", "Butter", "Heavy cream",
        "Cheese (e.g., cheddar, mozzarella)", "Olive oil", "Coconut oil", "Almond flour",
        "Chia seeds", "Flaxseeds", "Spinach", "Broccoli", "Cauliflower", "Zucchini",
        "Mushrooms", "Fresh herbs (e.g., basil, parsley)", "Low-carb vegetables (e.g., bell peppers, green beans)",
        "Nuts (e.g., almonds, walnuts)", "Berries (in moderation, e.g., raspberries)",
        "Sugar-free sweeteners (e.g., stevia, erythritol)", "Bone broth"
    ];

    // Get elements
    const preselectedList = document.getElementById("pre-list");
    const tbody = document.getElementById("table-body");

    // Choose the list based on the selected value
    let selectedList;
    switch (preselectedList.value) {
        case "basic":
            selectedList = basicGroceryList;
            break;
        case "vegan":
            selectedList = veganGroceryList;
            break;
        case "vegetarian":
            selectedList = vegetarianGroceryList;
            break;
        case "gluten-free":
            selectedList = glutenFreeGroceryList;
            break;
        case "keto":
            selectedList = ketoGroceryList;
            break;
        default:
            selectedList = [];
    }

    // Add rows to the table body
    selectedList.forEach(item => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" class="grocery-list-entry" aria-label="Ingredient entry" value="${item}"></td>
            <td><input type="number" class="grocery-list-entry" aria-label="Quantity entry"></td>
            <td><input type="checkbox" class="grocery-list-entry" aria-label="Bought checkbox"></td>
        `;
        tbody.appendChild(newRow);
    });
}

let currentQuestion = {};

function quizSetUp() {
    // Define variables, ingredients, and diets
    const ingredients = [
        { name: "an-onion", diets: ["vegan", "vegetarian", "keto", "gluten-free"] },
        { name: "steak", diets: ["keto", "gluten-free"] },
        { name: "bread", diets: ["vegan", "vegetarian", "keto"] },
        { name: "milk", diets: ["vegetarian", "gluten-free"] }
    ];

    const diets = ["vegan", "vegetarian", "keto", "gluten-free"];

    // Generate random indices
    const ingredientsRandomIndex = Math.floor(Math.random() * ingredients.length);
    const dietsRandomIndex = Math.floor(Math.random() * diets.length);

    // Get random ingredient and diet
    const randomIngredient = ingredients[ingredientsRandomIndex];
    const randomIngredientCleanedName = randomIngredient.name.replace(/-/g, " ");
    const randomDiet = diets[dietsRandomIndex];

    // Create a new img element
    const quizImage = document.createElement("img");
    quizImage.src = `assets/images/${randomIngredient.name}.jpeg`;
    quizImage.classList.add("quiz-image");
    quizImage.alt = randomIngredient.name;
    quizImage.draggable = false;
    quizImage.setAttribute("aria-label", "quiz-image");

    // Create a new h3 element
    const quizQuestion = document.createElement("h3");
    quizQuestion.classList.add("quiz-question");
    quizQuestion.innerHTML = `Is ${randomIngredientCleanedName} ${randomDiet}?`;

    // Get containers
    const imageContainer = document.querySelector(".image-container");
    const questionContainer = document.querySelector(".question-container");

    // Clear previous content
    imageContainer.innerHTML = "";
    questionContainer.innerHTML = "";

    // Append new elements
    imageContainer.appendChild(quizImage);
    questionContainer.appendChild(quizQuestion);

    // Store the current question state
    currentQuestion = {
        ingredient: randomIngredient,
        diet: randomDiet
    };
}

let correctCounter = 0;
let incorrectCounter = 0;

function quizTest() {
    // Define buttons
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");

    // Initialize counters
    const correctCountElement = document.getElementById("correct-count");
    const incorrectCountElement = document.getElementById("incorrect-count");

    // Update the counters on the page
    function updateCounters() {
        if (correctCountElement) {
            correctCountElement.textContent = correctCounter;
        }
        if (incorrectCountElement) {
            incorrectCountElement.textContent = incorrectCounter;
        }
    }

    // Handle answer logic
    function handleAnswer(isYes) {
        const { ingredient, diet } = currentQuestion; // Make sure currentQuestion is defined

        if (isYes) {
            if (ingredient.diets.includes(diet)) {
                correctCounter += 1;
            } else {
                incorrectCounter += 1;
            }
        } else {
            if (ingredient.diets.includes(diet)) {
                incorrectCounter += 1;
            } else {
                correctCounter += 1;
            }
        }
        updateCounters(); // Update counters on the page
        quizSetUp(); // Load a new question
    }

    if (yesButton) {
        yesButton.addEventListener("click", () => handleAnswer(true));
    }

    if (noButton) {
        noButton.addEventListener("click", () => handleAnswer(false));
    }
}

// Setup quiz and attach event listeners when the document is ready
document.addEventListener("DOMContentLoaded", () => {
    quizSetUp();
    quizTest();
});
