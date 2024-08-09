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
    let category = document.getElementById('add-ingredient-category').value;
    let date = document.getElementById('add-ingredient-date').value;

    let pantryItem = document.createElement('div');
    pantryItem.className = 'pantry-item';
    pantryItem.innerHTML =`
    <div class ="counter-container"> 
        <h3 class="pantry-title">${ingredient}</h3>
    </div>
    <div class="pantry-text">
        <span class="ingredient-quantity">
            <p>+</p>
            <p>${quantity}</p>
            <p>-</p>
        </span>
        <div>
            <p class="sub-pantry-text">${category}</p>
            <p class="sub-pantry-text">${date}</p>
        </div>
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
    let ingredientForm = document.getElementById('add-ingredient-form');
    if (ingredientForm.classList.contains('visible')) {
        ingredientForm.classList.remove('visible');
        ingredientForm.style.opacity = '0';
    } else {
        ingredientForm.classList.add('visible');
        ingredientForm.style.opacity = '1';
    }
}    

document.getElementById('ingredient-form').addEventListener('submit', addIngredients);

function modifyQuantity () {
    let counter=document.querySelector('.counter');
    if (counter.textContent === '+') {
        parseInt(quantity) += 1;
    }
    else if (counter.textContent === '-') {
        parseInt(quantity) -= 1;
    }
    else {
        alert('something went wrong')
    }
}