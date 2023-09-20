import { useState } from 'react';

function SearchBar() {
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <button data-testid="search-top-btn" onClick={ handleClick }>Buscar</button>
      { showForm
      && (
        <form action="">
          <input
            type="text"
            data-testid="search-input"
          />
          <label htmlFor="">
            Ingredient
            <input
              type="radio"
              name="ingredient"
              id=""
              data-testid="ingredient-search-radio"
            />
            Name
            <input
              type="radio"
              name="name"
              id=""
              data-testid="name-search-radio"
            />
            First Letter
            <input
              type="radio"
              name="firstLetter"
              id=""
              data-testid="first-letter-search-radio"
            />
          </label>
          <button data-testid="exec-search-btn">Search</button>
        </form>
      )}
    </div>
  );
}
export default SearchBar;
