import { createStore } from "redux";
import reducer from "./redux/reducers/categoryReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools());

export default store;
