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

let randomIngredient;
let randomDiet;
function loadQuizQuestion () {
    // Is (an ingredient) (a diet)?
    // Remove the current content in the containers.
    let contentContainer = document.getElementById("content-container");
    let questionContainer = document.getElementById("question-container");
    contentContainer.innerHTML = "";
    questionContainer.innerHTML = "";
    //define variables:
    const ingredients = [
        { name: "an onion", diet:["vegan", "vegetarian", "gluten-free", "keto"], address: "assets/images/onion.jpeg"},
        { name: "bread", diet:["vegan", "vegetarian"], address: "assets/images/bread.jpeg" },
        { name: "milk", diet:["vegetarian", "gluten-free"], address: "assets/images/milk.jpeg" },
        { name: "steak", diet:["gluten-free", "keto"], address: "assets/images/steak.jpeg"},
    ];

    const diets = ["vegan", "vegetarian", "gluten-free", "keto"];
    //get a random ingredient & diet from the list
    randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    randomDiet = diets[Math.floor(Math.random() * diets.length)];
    //load image for the container
    img = document.createElement("img");
    img.src = randomIngredient.address;
    img.alt = randomIngredient.name;
    img.classList.add("quiz-image");
    document.getElementById("content-container").appendChild(img);
    //load question for the container
    questionContainer.innerHTML = `<h3>Is <span id="random-ingredient">${randomIngredient.name}</span> <span id="random-diet">${randomDiet}</span>?</h3>`;
}function checkAnswer(isYesButtonClicked) {
    // Define right and wrong answers
    const correct = randomIngredient.diet.includes(randomDiet);

    // Define variables
    const correctCounter = document.getElementById("correct-count");
    const incorrectCounter = document.getElementById("incorrect-count");
    const questionContainer = document.getElementById("question-container");

    // If the answer is correct
    if ((isYesButtonClicked && correct) || (!isYesButtonClicked && !correct)) {
        correctCounter.textContent = parseInt(correctCounter.textContent) + 1;
        questionContainer.style.backgroundColor = "var(--clr-button)";
    } else {
        incorrectCounter.textContent = parseInt(incorrectCounter.textContent) + 1;
        questionContainer.style.backgroundColor = "var(--clr-button-red)";
    }

    // Reset background color after a delay
    setTimeout(() => {
        questionContainer.style.backgroundColor = "";
    }, 300);

    // Load a new question
    loadQuizQuestion();
}

document.getElementById("start-quiz-button").addEventListener("click", loadQuizQuestion);