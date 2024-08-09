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
    let ingredientForm = document.getElementById('add-ingredient-form');
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
            <button class="quantity-button" id="add-quantity" onclick="changeQuantity(this, 1)">+</button>
            <p class="quantity-number">${quantity}</p>
            <button class="quantity-button" id="substract-quantity" onclick="changeQuantity(this, -1)">-</button>
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

    let ingredientForm = document.getElementById('add-ingredient-form');
    if (ingredientForm.classList.contains('visible')) {
        ingredientForm.classList.remove('visible');
        ingredientForm.style.opacity = '0';
    } else {
        ingredientForm.classList.add('visible');
        ingredientForm.style.opacity = '1';
    }
    document.getElementById('pantry-list').appendChild(pantryItem);
    closeWindow(); // Close the form after adding the ingredient
}

document.getElementById('ingredient-form').addEventListener('submit', addIngredients);

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

function deleteItem (button) {
    let pantryItem = button.closest('.pantry-item');
    pantryItem.remove();
}

function addRow() {
    let tbody = document.getElementById('table-body');
    let newRow = document.createElement('tr');
    
newRow.innerHTML =`
            <td><input type="text" class="grocery-list-entry" aria-label="Ingredient entry"></td>
            <td><input type="number" class="grocery-list-entry" aria-label="Quantity entry"></td>
            <td><input type="checkbox" class="grocery-list-entry" aria-label="Bought checkbox"></td>
        `;
        tbody.appendChild(newRow);
}
function removeRow() {
    let tbody = document.getElementsByTagName('tbody')[0];
    let lastRow = tbody.lastElementChild;
    
    if (lastRow) { // Check if there is at least one row to remove
        tbody.removeChild(lastRow);
    }
}
