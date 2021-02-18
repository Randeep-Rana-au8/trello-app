import React, { useState } from "react";

const CategoryInput = ({ sendData, placeholder }) => {
  const [name, setName] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    sendData({ name });
    setName("");
  };

  return (
    <form onSubmit={handleClick}>
      <input required placeholder={placeholder} value={name} onChange={(e) => setName(e.target.value)} type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategoryInput;
