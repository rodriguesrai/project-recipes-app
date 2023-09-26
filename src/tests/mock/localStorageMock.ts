const localStorageMock = {
  setItem: (key, value) => {
    localStorage[key] = value;
  },
  getItem: (key) => {
    return localStorage[key];
  },
  removeItem: (key) => {
    delete localStorage[key];
  },
};

export default localStorageMock;
