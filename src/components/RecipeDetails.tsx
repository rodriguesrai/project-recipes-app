import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function RecipeDetails() {
  const [recipeDetailsAPI, setRecipeDetailsAPI] = useState<object[]>();
  const { pathname } = useLocation();

  const param = useParams();

  useEffect(() => {
    const fetchRecipeDetailsAPI = async (id: string) => {
      const URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL_API);
      const data = await response.json();
      setRecipeDetailsAPI(data.meals);
    };
    const fetchDrinkAPI = async (id: string) => {
      const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL_API);
      const data = await response.json();
      setRecipeDetailsAPI(data.drinks);
    };
    if (pathname.includes('drinks')) {
      fetchDrinkAPI(param.id);
    }
    fetchRecipeDetailsAPI(param.id);
  }, []);

  return (
    <div>
      { pathname.includes('meals') ? (
        <div>
          {' '}
          { recipeDetailsAPI && recipeDetailsAPI.map((recipe) => (
            <p
              key={ recipe.idMeal }
            >
              {recipe.strArea}

            </p>
          ))}

        </div>
      )
        : (
          <div>
            {recipeDetailsAPI && recipeDetailsAPI.map((recipe) => (
              <p>{recipe.strDrink}</p>
            ))}
          </div>
        )}
    </div>
  );
}
export default RecipeDetails;
