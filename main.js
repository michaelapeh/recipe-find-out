document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const recipeContainer = document.getElementById('recipe-container');

  const appId = '4356b96a';
  const appKey = '39439f7e625c3095595470ccbbfcd925';

  const getRecipes = async (query) => {
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const displayRecipes = (recipes) => {
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
      const recipeHTML = `
        <div class="recipe">
          <h2>${recipe.recipe.label}</h2>
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
          <p>Ingredients:</p>
          <ul>
            ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>`;
      recipeContainer.innerHTML += recipeHTML;
    });
  };

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '') {
      getRecipes(query);
    }
  });
});
