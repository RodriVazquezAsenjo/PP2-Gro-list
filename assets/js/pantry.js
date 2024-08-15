/*jshint esversion: 6 */
// Global Variables
 // Container for the pantry items
const itemsContainer = document.querySelector("[data-items-container]");
 // Button to show the form
const addItemButton = document.querySelector("[data-add-item-button]");
 // Button to close the form
const closeWindowButton = document.querySelector("[data-close-window]");
 // Form container
const newItemForm = document.querySelector("[data-new-item-form]");
 // Input field for the item name
const itemName = document.querySelector("[data-item-name]");
 // Input field for the item quantity
const itemQuantity = document.querySelector("[data-item-quantity]");
 // Input field for the item category
const itemCategory = document.querySelector("[data-item-category]");
 // Input field for the item expiration date
const itemExpiration = document.querySelector("[data-item-expiration]");
// Modify the quantity of an item
itemsContainer.addEventListener("click", modifyQuantity);
/**
 * Create a key for the local storage
 */
const LOCAL_STORAGE_KEY = "pantry.items";
// Initialize items array
/**
 * Retrieve the items from local storage or create an empty array
 */
let items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

/**
 * Adds an event listener to the add item button to display the form
 */
addItemButton.addEventListener("click", () => {
  newItemForm.style.display = "flex";
});

/**
 * Adds an event listener to the close button to hide the form
 */
closeWindowButton.addEventListener("click", () => {
  newItemForm.style.display = "none";
});

/**
 * @param {Event} e
 * Adds an event listener to the form to create a new item, render the pantry, save the items, hide the form, and reset the form fields
 */
newItemForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting the traditional way
  createItem();
  renderPantry();
  saveItems();
  newItemForm.style.display = "none"; // Hide the form
  newItemForm.reset(); // Reset form fields after adding an item
});

/**
 * 
 * @param {Event} e 
 * Modifies the quantity of an item, deletes an item, and saves the items
 */
function modifyQuantity(e) {
  const pantryItem = e.target.closest(".pantry-item");
  if (pantryItem) {
    const index = pantryItem.dataset.index;
    if (e.target.hasAttribute("data-add-quantity")) {
      items[index].quantity++;
    } else if (e.target.hasAttribute("data-subtract-quantity")) {
      if (items[index].quantity > 0) {
        items[index].quantity--;
      }
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
}
/**
 * Saves the items to local storage
 */
function saveItems() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

/**
 * Create a new item and add it to the items array
 */
function createItem() {
  const item = {
    id: Date.now().toString(), // Unique ID for each item
    name: itemName.value,
    quantity: parseInt(itemQuantity.value, 10), // Ensure quantity is a number
    category: itemCategory.value,
    expiration: itemExpiration.value,
  };
  items.push(item);
}

/**
 * Renders the pantry items
 */
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

/**
 * 
 * @param {HTMLElement} container 
 */
function clearItems(container) {
  while (container.children.length > 1) {
    container.removeChild(container.lastChild);
  }
}

// Initial call to render the pantry
renderPantry();
