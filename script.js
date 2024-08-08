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

    let ingredientDetails = [];
    let ingredient = document.getElementById('add-ingredient-text').value;
    let quantity = document.getElementById('add-ingredient-quantity').value;
    
    ingredientDetails.push(ingredient);
    ingredientDetails.push(quantity);
    
    for (let i=0; i<ingredientDetails.length; i++) {
        let pantryItem = document.createElement('div');
        pantryItem.className = 'pantry-item';
        pantryItem.innerHTML =`
        <div class="pantry-text">
            <span class="counter">${ingredientDetails[i+1]}</span>
            <h3 class="pantry-title">${ingredientDetails[0]}</h3>
        </div>`
        ;
        document.getElementById('pantry-list').appendChild(pantryItem);
    }    
    console.log(ingredientDetails);
}
document.getElementById('button-add').addEventListener('submit', addIngredients);
addIngredients();