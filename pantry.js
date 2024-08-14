// Global Variables
const itemsContainer = document.querySelector("[data-items-container]"); // Container for the pantry items
const addItemButton = document.querySelector("[data-add-item-button]"); // Button to show the form
const closeWindowButton = document.querySelector("[data-close-window]"); // Button to close the form
const newItemForm = document.querySelector("[data-new-item-form]"); // Form container
const itemName = document.querySelector("[data-item-name]"); // Input field for the item name
const itemQuantity = document.querySelector("[data-item-quantity]"); // Input field for the item quantity
const itemCategory = document.querySelector("[data-item-category]"); // Input field for the item category
const itemExpiration = document.querySelector("[data-item-expiration]"); // Input field for the item expiration date
const addItemDetails = document.querySelector("[data-add-item-details]"); // Button to submit the form
// Local Storage
const LOCAL_STORAGE_KEY = "pantry.items"; // Key for the local storage
// Initialize items array
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

// Show the form when the addItemButton is clicked
addItemButton.addEventListener("click", () => {
    newItemForm.style.display = "flex";
});

// Hide the form when the close button is clicked
closeWindowButton.addEventListener("click", () => {
    newItemForm.style.display = "none";
});

// Handle form submission
newItemForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    createItem();
    renderPantry();
    saveItems();
    newItemForm.style.display = "none"; // Hide the form
    newItemForm.reset(); // Reset form fields after adding an item
});

// Modify the quantity of an item
itemsContainer.addEventListener("click", (e) => {
    const pantryItem = e.target.closest(".pantry-item");
    const pantryText = e.target.closest(".pantry-text");
    if (pantryItem) {
        const index = pantryItem.dataset.index;
        if (e.target.hasAttribute("data-add-quantity")) {
            items[index].quantity++;
        } else if (e.target.hasAttribute("data-subtract-quantity")) {
            if (items[index].quantity > 1) {
                items[index].quantity--;
            }
        }
        // Update border color based on quantity
        const quantityValue = items[index].quantity;
        if (quantityValue < 2) {
            pantryText.style.borderTop = "3px solid red";
        } else if (quantityValue < 4) {
            pantryText.style.borderTop = "3px solid orange";
        } else {
            pantryText.style.borderTop = "3px solid green";
        }
        renderPantry();
        saveItems();
    }
    // Handle item deletion
    if (e.target.hasAttribute("data-delete-item")) {
        const index = e.target.closest(".pantry-item").dataset.index;
        items.splice(index, 1); // Remove item from array
        renderPantry();
        saveItems();
    }
});

// Save the items to local storage
function saveItems() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

// Create and add an item to the list
function createItem() {
    const item = {
        id: Date.now().toString(), // Unique ID for each item
        name: itemName.value,
        quantity: parseInt(itemQuantity.value, 10), // Ensure quantity is a number
        category: itemCategory.value,
        expiration: itemExpiration.value
    };
    items.push(item);
}

// Render the pantry items
function renderPantry() {
    clearItems(itemsContainer);
    items.forEach((item, index) => {
        const pantryItem = document.createElement("div");
        pantryItem.classList.add("pantry-item");
        pantryItem.dataset.index = index; // Add data-index attribute for reference
        pantryItem.innerHTML = `
        <div class="counter-container">
            <p class="button-close-pantry-item" data-delete-item>+</p>
            <h3 class="pantry-title">${item.name}</h3>
        </div>
        <div class="pantry-text">
            <span class="ingredient-quantity">
                <button class="quantity-button add-quantity" data-add-quantity>+</button>
                <p class="quantity-number">${item.quantity}</p>
                <button class="quantity-button subtract-quantity" data-subtract-quantity>-</button>
            </span>
            <div>
                <p class="sub-pantry-text">${item.category}</p>
                <p class="sub-pantry-text">${item.expiration}</p>
            </div>
        </div>
        `;
        itemsContainer.appendChild(pantryItem);
    });
}

// Clear items from the pantry, keeping the very first child
function clearItems(container) {
    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }
}

// Initial call to render the pantry
renderPantry();
