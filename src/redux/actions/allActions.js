import axios from "axios";

export const add_category = (data) => {
  const cateFunc = async () => {
    const cate = await axios.post("https://trello-backend-api.herokuapp.com/addcategory", { name: data.name });
  };

  cateFunc();

  return {
    type: "ADD_CATEGORY",
    payload: data,
  };
};

export const fetch_category = (data) => {
  return {
    type: "FETCH_CATEGORY",
    payload: data,
  };
};

export const delete_category = (id) => {
  return {
    type: "DELETE_CATEGORY",
    payload: id,
  };
};
