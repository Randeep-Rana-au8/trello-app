const initialState = {
  category: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        // category: [...state.category, action.payload],
      };
    case "FETCH_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "DELETE_CATEGORY":
      const new_categories = state.category.filter((cate) => cate._id !== action.payload._id);
      return {
        ...state,
        category: new_categories,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
