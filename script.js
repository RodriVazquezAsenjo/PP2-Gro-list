function openNav() {
    let nav = document.getElementById('nav-bar');
    if (nav.style.height === '80px') {
        nav.style.height = '0';
        nav.style.visibility = 'hidden';
    } else {
        nav.style.height = '80px';
        nav.style.visibility = 'visible';
    }
}

function closeWindow() {
    let ingredientForm = document.getElementById('form-container');
    if (ingredientForm.classList.contains('visible')) {
        ingredientForm.classList.remove('visible');
        ingredientForm.style.opacity = '0';
    } else {
        ingredientForm.classList.add('visible');
        ingredientForm.style.opacity = '1';
    }
}

function addIngredients(event) {
    event.preventDefault();

    let ingredient = document.getElementById('add-ingredient-text').value;
    let quantity = document.getElementById('add-ingredient-quantity').value;
    let category = document.getElementById('add-ingredient-category').value;
    let date = document.getElementById('add-ingredient-date').value;

    let pantryItem = document.createElement('div');
    pantryItem.className = 'pantry-item';
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

    let border = pantryItem.querySelector('.pantry-text');
    if (parseInt(quantity) === 1) {
        border.style.borderTop = '3px solid red';
    } else if (parseInt(quantity) <= 3) {
        border.style.borderTop = '3px solid orange';
    } else {
        border.style.borderTop = '3px solid green';
    }

    document.getElementById('pantry-list').appendChild(pantryItem);
    closeWindow(); // Close the form after adding the ingredient
}

document.addEventListener('DOMContentLoaded', () => {
    const ingredientForm = document.getElementById('ingredient-form');
    if (ingredientForm) {
        ingredientForm.addEventListener('submit', addIngredients, false);
    }
});

function changeQuantity(button, amount) {
    let counter = button.parentElement.querySelector('.quantity-number');
    let border = button.closest('.pantry-text');
    let currentValue = parseInt(counter.textContent);
    currentValue += amount;
    if (currentValue < 0) currentValue = 0; // Prevent negative quantity
    counter.textContent = currentValue;
    if (currentValue <= 3) border.style.borderTop = '3px solid orange';
    if (currentValue <= 1) border.style.borderTop = '3px solid red';
    if (currentValue > 3) border.style.borderTop = '3px solid green';
}

function deleteItem(button) {
    let pantryItem = button.closest('.pantry-item');
    pantryItem.remove();
}

function addRow() {
    let tbody = document.getElementById('table-body');
    let newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text" class="grocery-list-entry" aria-label="Ingredient entry"></td>
        <td><input type="number" class="grocery-list-entry" aria-label="Quantity entry"></td>
        <td><input type="checkbox" class="grocery-list-entry" aria-label="Bought checkbox"></td>
    `;
    tbody.appendChild(newRow);
}

function removeRow() {
    let tbody = document.getElementById('table-body');
    let lastRow = tbody.lastElementChild;
    
    if (lastRow) { // Check if there is at least one row to remove
        tbody.removeChild(lastRow);
    }
}

function addPreList(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Define the lists
    const basicGroceryList = [
      'Milk', 'Eggs', 'Bread', 'Butter', 'Apples', 'Bananas', 'Chicken breasts',
      'Rice', 'Pasta', 'Tomato sauce', 'Coffee', 'Sugar', 'Salt', 'Pepper'
    ];

    const veganGroceryList = [
      'Almond milk (or other plant-based milk)', 'Tofu', 'Tempeh', 'Lentils',
      'Chickpeas', 'Black beans', 'Quinoa', 'Brown rice', 'Oats', 'Whole grain bread',
      'Fresh fruits (e.g., apples, bananas, berries)', 'Fresh vegetables (e.g., spinach, broccoli, carrots)',
      'Avocados', 'Nuts (e.g., almonds, walnuts)', 'Seeds (e.g., chia seeds, flaxseeds)',
      'Olive oil', 'Nutritional yeast', 'Soy sauce', 'Tomato sauce', 'Herbs and spices (e.g., garlic, turmeric, cumin)',
      'Vegan yogurt'
    ];

    const vegetarianGroceryList = [
      'Milk', 'Cheese', 'Yogurt', 'Eggs', 'Tofu', 'Lentils', 'Chickpeas',
      'Black beans', 'Quinoa', 'Brown rice', 'Oats', 'Whole grain bread',
      'Fresh fruits (e.g., apples, bananas, berries)', 'Fresh vegetables (e.g., spinach, broccoli, carrots)',
      'Avocados', 'Nuts (e.g., almonds, walnuts)', 'Seeds (e.g., chia seeds, flaxseeds)',
      'Olive oil', 'Nutritional yeast', 'Tomato sauce', 'Herbs and spices (e.g., garlic, turmeric, cumin)',
      'Vegetarian pasta'
    ];

    const glutenFreeGroceryList = [
      'Gluten-free bread', 'Gluten-free pasta', 'Quinoa', 'Rice', 'Potatoes',
      'Fresh fruits (e.g., apples, bananas, berries)', 'Fresh vegetables (e.g., spinach, broccoli, carrots)',
      'Chicken breasts', 'Fish', 'Eggs', 'Nuts (e.g., almonds, walnuts)', 'Seeds (e.g., chia seeds, flaxseeds)',
      'Olive oil', 'Gluten-free soy sauce', 'Gluten-free oats', 'Canned beans (ensure they are gluten-free)',
      'Gluten-free baking flour', 'Yogurt (check for gluten-free labeling)', 'Cheese',
      'Herbs and spices (e.g., garlic, turmeric, cumin)'
    ];

    const ketoGroceryList = [
      'Avocados', 'Eggs', 'Chicken breasts', 'Beef', 'Salmon', 'Butter', 'Heavy cream',
      'Cheese (e.g., cheddar, mozzarella)', 'Olive oil', 'Coconut oil', 'Almond flour',
      'Chia seeds', 'Flaxseeds', 'Spinach', 'Broccoli', 'Cauliflower', 'Zucchini',
      'Mushrooms', 'Fresh herbs (e.g., basil, parsley)', 'Low-carb vegetables (e.g., bell peppers, green beans)',
      'Nuts (e.g., almonds, walnuts)', 'Berries (in moderation, e.g., raspberries)',
      'Sugar-free sweeteners (e.g., stevia, erythritol)', 'Bone broth'
    ];

    // Get elements
    const preselectedList = document.getElementById('pre-list');
    const tbody = document.getElementById('table-body');

    // Choose the list based on the selected value
    let selectedList;
    switch (preselectedList.value) {
      case 'basic':
        selectedList = basicGroceryList;
        break;
      case 'vegan':
        selectedList = veganGroceryList;
        break;
      case 'vegetarian':
        selectedList = vegetarianGroceryList;
        break;
      case 'gluten-free':
        selectedList = glutenFreeGroceryList;
        break;
      case 'keto':
        selectedList = ketoGroceryList;
        break;
      default:
        selectedList = [];
    }

    // Add rows to the table body
    selectedList.forEach(item => {
      let newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><input type="text" class="grocery-list-entry" aria-label="Ingredient entry" value="${item}"></td>
        <td><input type="number" class="grocery-list-entry" aria-label="Quantity entry"></td>
        <td><input type="checkbox" class="grocery-list-entry" aria-label="Bought checkbox"></td>
      `;
      tbody.appendChild(newRow);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const listSelection =document.getElementById('list-selection');
    if (listSelection) {
        listSelection.addEventListener('submit', addPreList, false);
    }
});

function randomPicture() {
    // Array of image filenames
    let images = ['onions', 'steak', 'bread', 'milk'];
    let allDiets = ['vegan', 'vegetarian', 'keto', 'gluten-free']
    // Array of ingredients with diet information
    let ingredients = [
        {name: 'onions', diets: ['vegan', 'vegetarian', 'keto', 'gluten-free']},
        {name: 'steak', diets: ['keto', 'gluten-free']},
        {name: 'bread', diets: ['vegan', 'vegetarian', 'keto']},
        {name: 'milk', diets: ['vegetarian', 'gluten-free']},
    ];

    // Generate a random index
    let i = Math.floor(Math.random() * images.length);
    let x = Math.floor(Math.random() * allDiets.length);
    // Create a new image element
    let img = document.createElement('img');
    img.className = 'quiz-image';  // Set the class name
    img.src = `assets/images/${images[i]}.jpeg`; // Set the image source with directory path
    img.alt = ingredients[i].name; // Set alternative text for accessibility
    img.setAttribute('aria-label', 'quiz-image'); // Set aria-label attribute for accessibility


    // Append the image to the container
    document.querySelector('.image-container').appendChild(img);

    let question = document.createElement('h3');
    question.className = "quiz-question";
    question.innerHTML =`
        Is ${images[i]} ${allDiets[x]}?
        `;
    document.querySelector('.question-container').appendChild(question);

}

// Ensure the DOM is fully loaded before running the function
document.addEventListener('DOMContentLoaded', randomPicture);
