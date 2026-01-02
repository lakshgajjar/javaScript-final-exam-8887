let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let editIndex = null;

const form = document.getElementById("recipe-book");
const recipetitle = document.getElementById("recipetitle");
const ingredients = document.getElementById("ingredients");
const details = document.getElementById("details");
const cuisine = document.getElementById("cuisine");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("restaurantrecipebookList");
const search = document.getElementById("search");
const filterCuisine = document.getElementById("filterCuisine");

function saveData() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function displayRecipes(data = recipes) {
    list.innerHTML = "";
    filterCuisine.innerHTML = `<option value="all">All</option>`;

    let cuisines = [...new Set(recipes.map(r => r.cuisine))];
    cuisines.forEach(c => {
        filterCuisine.innerHTML += `<option value="${c}">${c}</option>`;
    });

    if (data.length === 0) {
        list.innerHTML = "<p style='text-align:center;'>No recipes found</p>";
        return;
    }

    data.forEach((r, i) => {
        list.innerHTML += `
        <div class="card">
        <h4>${r.recipetitle}</h4>
        <p><b>Ingredients:</b> ${r.ingredients}</p>
        <p><b>Instructions:</b> ${r.details}</p>
        <p><b>Cuisine:</b> ${r.cuisine}</p>
        <button onclick="editRecipe(${i})">Edit</button>
        <button onclick="deleteRecipe(${i})">Delete</button>
      </div>
    `;
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();

    if (!recipetitle.value || !ingredients.value) {
        alert("Please enter your order name");
        return;
    }

    const recipe = {
        recipetitle: recipetitle.value.trim(),
        ingredients: ingredients.value.trim(),
        details: details.value.trim(),
        cuisine: cuisine.value.trim()
    };

    if (editIndex === null) {
        recipes.push(recipe);
    } else {
        recipes[editIndex] = recipe;
        editIndex = null;
        addBtn.textContent = "Add Recipe";
    }

    saveData();
    displayRecipes();
    form.reset();
});

function editRecipe(i) {
    const r = recipes[i];
    recipetitle.value = r.recipetitle;
    ingredients.value = r.ingredients;
    details.value = r.details;
    cuisine.value = r.cuisine;
    editIndex = i;
    addBtn.textContent = "Update Recipe";
}

function deleteRecipe(i) {
    recipes.splice(i, 1);
    saveData();
    displayRecipes();
}

search.addEventListener("input", () => {
    const val = search.value.toLowerCase();
    const filtered = recipes.filter(r =>
        r.recipetitle.toLowerCase().includes(val) ||
        r.ingredients.toLowerCase().includes(val)
    );
    displayRecipes(filtered);
});

filterCuisine.addEventListener("change", () => {
    const val = filterCuisine.value;
    if (val === "all") {
        displayRecipes();
    } else {
        displayRecipes(recipes.filter(r => r.cuisine === val));
    }
});

displayRecipes();
