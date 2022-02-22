if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', findRecipes);
} else {
    findRecipes();
}

async function findRecipes(){
    let nameOfItem = window.localStorage.getItem("nameOfItem");

    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${nameOfItem}&app_id=af6fa649&app_key=2cb737499eba1f32b2d521fc6ad75073`;
    let httpResponse = await fetch(url);
    let requestBody = await httpResponse.json();
    recipes = requestBody;

    console.log(recipes);
    console.log(recipes.hits[0].recipe.ingredients[0].food);

    recipeList = recipes.hits;
    for(let i=0; i<5; i++){
        appendItems(recipeList[i]);
    }

}

function appendItems(recipe){
    let currentRow = document.createElement("tr");
    let cartTable = document.querySelector(".table");

    currentRow.classList.add("cart-row");
    currentRow.innerHTML = 
        `<tr>
            <td> 
                <h2>${recipe.recipe.label}</h2> 
                <img class="img-fluid" src="${recipe.recipe.image}" alt=""/> 
                <h3>Ingredients</h3> 
                <ul class="list-group"></ul> 
            </td>
        </tr>`;
    cartTable.appendChild(currentRow);

    var ingredients = recipe.recipe.ingredientLines;
    for(let i=0; i<ingredients.length; i++){
        var currentData = document.createElement("li");
        currentRow.classList.add("list-group-item");
        currentData.innerHTML = `${ingredients[i]}`;
        currentRow.getElementsByClassName("list-group")[0].appendChild(currentData);
    }
    console.log(currentData)
}