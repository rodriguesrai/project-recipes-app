export type LoginType = {
  email: string,
  password: string,
};

export type SearchParmType = {
  input: string,
  parm: string,
};

export type ApiReturnTypeMeals =
  {
    meals: [
      {
        idMeal: string,
        strMeal: string,
        strDrinkAlternate: string | null,
        strCategory: string,
        strArea: string,
        strInstructions: string,
        strMealThumb: string,
        strTags: string,
        strYoutube: string,
        strIngredient1?: string,
        strIngredient2?: string,
        strIngredient3?: string,
        strIngredient4?: string,
        strIngredient5?: string,
        strIngredient6?: string,
        strIngredient7?: string,
        strIngredient8?: string,
        strIngredient9?: string,
        strIngredient10?: string,
        strIngredient11?: string,
        strIngredient12?: string,
        strIngredient13?: string,
        strIngredient14?: string,
        strIngredient15?: string,
        strIngredient16?: string | null,
        strIngredient17?: string | null,
        strIngredient18?: string | null,
        strIngredient19?: string | null,
        strIngredient20?: string | null,
        strMeasure1?: string,
        strMeasure2?: string,
        strMeasure3?: string,
        strMeasure4?: string,
        strMeasure5?: string,
        strMeasure6?: string,
        strMeasure7?: string,
        strMeasure8?: string,
        strMeasure9?: string,
        strMeasure10?: string,
        strMeasure11?: string,
        strMeasure12?: string,
        strMeasure13?: string,
        strMeasure14?: string,
        strMeasure15?: string,
        strMeasure16?: string | null,
        strMeasure17?: string | null,
        strMeasure18?: string | null,
        strMeasure19?: string | null,
        strMeasure20?: string | null,
        strSource?: string | null,
        strImageSource?: string | null,
        strCreativeCommonsConfirmed?: string | null,
        dateModified?: string | null
      },
    ]
  };

export type ApiReturnDrinks =
{
  drinks:[
    {
      idDrink: string;
      strDrink: string;
      strDrinkAlternate: null | string;
      strTags: string;
      strVideo: null | string;
      strCategory: string;
      strIBA: string | null;
      strAlcoholic: string;
      strGlass: string;
      strInstructions: string;
      strInstructionsES: null | string;
      strInstructionsDE: string | null;
      strInstructionsFR: null | string;
      strInstructionsIT: string | null;
      strInstructionsZH_HANS: null | string;
      strInstructionsZH_HANT: null | string;
      strDrinkThumb: string;
      strIngredient1: string;
      strIngredient2: string;
      strIngredient3: string;
      strIngredient4: string | null;
      strIngredient5: string | null;
      strIngredient6: string | null;
      strIngredient7: string | null;
      strIngredient8: string | null;
      strIngredient9: string | null;
      strIngredient10: string | null;
      strIngredient11: string | null;
      strIngredient12: string | null;
      strIngredient13: string | null;
      strIngredient14: string | null;
      strIngredient15: string | null;
      strMeasure1: string;
      strMeasure2: string;
      strMeasure3: string;
      strMeasure4: string | null;
      strMeasure5: string | null;
      strMeasure6: string | null;
      strMeasure7: string | null;
      strMeasure8: string | null;
      strMeasure9: string | null;
      strMeasure10: string | null;
      strMeasure11: string | null;
      strMeasure12: string | null;
      strMeasure13: string | null;
      strMeasure14: string | null;
      strMeasure15: string | null;
      strImageSource: string;
      strImageAttribution: string;
      strCreativeCommonsConfirmed: string;
      dateModified: string;
    }]
};

export type ApiReturnType = ApiReturnTypeMeals | ApiReturnDrinks | undefined;
