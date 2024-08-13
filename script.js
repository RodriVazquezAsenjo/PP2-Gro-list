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
