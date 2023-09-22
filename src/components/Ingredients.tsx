// import { useState, useEffect, useContext } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { RecipeMealsDetails } from '../types';
// import ContextSearch from '../context/ContextSearch';

// function Ingredients() {
//   const recipeDetailsContext = useContext(ContextSearch);
//   const { fetchRecipeDetailsAPI, recipeDetailsAPI } = recipeDetailsContext;
//   const { pathname } = useLocation();
//   const { idMeal, strArea, strCategory, strCreativeCommonsConfirmed, strDrinkAlternate,
//     strImageSource, strIngredient1, strIngredient2,
//     strIngredient3,
//     strIngredient4,
//     strIngredient5,
//     strIngredient6,
//     strIngredient7,
//     strIngredient8,
//     strIngredient9,
//     strIngredient10,
//     strIngredient11,
//     strIngredient12,
//     strIngredient13,
//     strIngredient14,
//     strIngredient15,
//     strIngredient16,
//     strIngredient17,
//     strIngredient18,
//     strIngredient19,
//     strIngredient20,
//     strInstructions,
//     strMea,
//     strMealThumb,
//     strMeasure1,
//     strMeasure2,
//     strMeasure3,
//     strMeasure4,
//     strMeasure5,
//     strMeasure6,
//     strMeasure7,
//     strMeasure8,
//     strMeasure9,
//     strMeasure10,
//     strMeasure11,
//     strMeasure12,
//     strMeasure13,
//     strMeasure14,
//     strMeasure15,
//     strMeasure16,
//     strMeasure17,
//     strMeasure18,
//     strMeasure19,
//     strMeasure20,
//     strSource,
//     strTags,
//     strYoutube } = recipeDetailsAPI[pathname];

//   const param = useParams();

//   useEffect(() => {
//     fetchRecipeDetailsAPI(pathname, param.id);
//   }, [param.id]);
//   return (
//     <div>
//       <ul data-testid={ `${index}-ingredient-name-and-measure` } key={ strMeal }>
//         <li>{`${strIngredient1} - ${strMeasure1}`}</li>
//         <li>{`${strIngredient2} - ${strMeasure2}`}</li>
//         <li>{`${strIngredient3} - ${strMeasure3}`}</li>
//         {strIngredient4 !== ''
//             && <li>{`${strIngredient4} - ${strMeasure4}`}</li>}
//         {strIngredient5 !== ''
//             && <li>{`${strIngredient5} - ${strMeasure5}`}</li>}
//         {strIngredient6 !== ''
//             && <li>{`${strIngredient6} - ${strMeasure6}`}</li>}
//         {strIngredient7 !== ''
//             && <li>{`${strIngredient7} - ${strMeasure7}`}</li>}
//         {strIngredient8 !== ''
//             && <li>{`${strIngredient8} - ${strMeasure8}`}</li>}
//         {strIngredient9 !== ''
//             && <li>{`${strIngredient9} - ${strMeasure9}`}</li>}
//         {strIngredient10 !== ''
//             && <li>{`${strIngredient10} - ${strMeasure10}`}</li>}
//         {strIngredient11 !== ''
//             && <li>{`${strIngredient11} - ${strMeasure11}`}</li>}
//         {strIngredient12 !== ''
//             && <li>{`${strIngredient12} - ${strMeasure12}`}</li>}
//         {strIngredient13 !== ''
//             && <li>{`${strIngredient13} - ${strMeasure13}`}</li>}
//         {strIngredient14 !== ''
//             && <li>{`${strIngredient14} - ${strMeasure14}`}</li>}
//         {strIngredient15 !== ''
//             && <li>{`${strIngredient15} - ${strMeasure15}`}</li>}
//         {strIngredient16 !== ''
//             && <li>{`${strIngredient16} - ${strMeasure16}`}</li>}
//         {strIngredient17 !== ''
//             && <li>{`${strIngredient17} - ${strMeasure17}`}</li>}
//         {strIngredient18 !== ''
//             && <li>{`${strIngredient18} - ${strMeasure18}`}</li>}
//         {strIngredient19 !== ''
//             && <li>{`${strIngredient19} - ${strMeasure19}`}</li>}
//         {strIngredient20 !== ''
//             && <li>{`${strIngredient20} - ${strMeasure20}`}</li>}
//       </ul>
//     </div>
//   );
// }
