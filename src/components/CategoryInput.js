import React, { useState } from "react";

const CategoryInput = ({ sendData, placeholder }) => {
  const [data, setData] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    sendData(data);
    setData("");
  };

  return (
    <form onSubmit={handleClick}>
      <input required placeholder={placeholder} value={data} onChange={(e) => setData(e.target.value)} type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryInput;
