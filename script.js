function openNav() {
    let nav = document.getElementById('nav-bar');
    if (nav.style.height === '80px') {
        nav.style.height = '0';
        nav.style.visibility = 'hidden';
    }
    else {
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

function addIngredients(event){
    event.preventDefault();

    let ingredient = document.getElementById('add-ingredient-text').value;
    let quantity = document.getElementById('add-ingredient-quantity').value;
    
    let pantryItem = document.createElement('div');
    pantryItem.className = 'pantry-item';
    pantryItem.innerHTML =`
    <div class ="counter-container">
        <div class="counter" id="add"><p>+</p></div>
        <div class="counter" id="subtract"><p>-</p></div>
    </div>
    <div class="pantry-text">
        <span class="ingredient-quantity">x${quantity}</span>
        <h3 class="pantry-title">${ingredient}</h3>
    </div>`
    ;

    let counter=pantryItem.querySelector('.pantry-text');
    if (parseInt(quantity) === 1) {
        counter.style.borderTop = '3px solid red';
    }
    else if (parseInt(quantity) <=4) {
        counter.style.borderTop = '3px solid orange';
    }
    else{
        counter.style.borderTop = '3px solid green';
    }
    document.getElementById('pantry-list').appendChild(pantryItem);
}    

document.getElementById('ingredient-form').addEventListener('submit', addIngredients);

function openPantryItem () {

}