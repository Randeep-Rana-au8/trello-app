const initialState = {
  category: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        category: [...state.category, action.payload],
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
