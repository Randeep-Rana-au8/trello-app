import { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import Category from "./components/Category";
import CategoryInput from "./components/CategoryInput";
import axios from "axios";

import { add_category, fetch_category } from "./redux/actions/allActions";

function App({ add_category, fetch_category, category }) {
  useEffect(() => {
    const fetchCategory = async () => {
      const cate = await axios.get("https://trello-backend-api.herokuapp.com/categories");
      fetch_category(cate.data);
    };

    fetchCategory();
  }, [category]);

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
          <Category key={c._id} cateName={c} />
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

export default connect(mapStateToProps, { add_category, fetch_category })(App);
