import { connect } from "react-redux";
import "./App.css";
import Category from "./components/Category";
import CategoryInput from "./components/CategoryInput";

import { add_category } from "./redux/actions/allActions";

function App({ add_category, category }) {
  return (
    <div className="App">
      <div>
        <div>
          <h1>Trello</h1>
          <CategoryInput placeholder={"Create new category"} sendData={add_category} />
        </div>
      </div>
      <div className="categoriesContainer">
        {category.map((c) => (
          <Category key={c} cateName={c} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

export default connect(mapStateToProps, { add_category })(App);
