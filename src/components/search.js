import React, { useState, useEffect } from "react";

const Search = () => {
  const [query, setQuery] = useState("Paneer");

  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?q=${query}&app_id=f8d233ed&app_key=
      19c52cb6cc6e8c0dae2fa7ab3653194c&type=public`
    )
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data.hits);
        const arrayData = data.hits;
        setData(arrayData);
      });
  },  [query ,isClicked]);

  return (
   <>
    <h2 className="top-heading">Kitchen Master</h2>
    <div className = "main-cont">
      <div className="header">
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Find your recipe here.."
        ></input>
        <button
          onClick={() => {
            setIsClicked((prevState) => !prevState);
          }}
        >
          Search
        </button>
      </div>
      <div className="display">
        {/* //looping through recipes */}
        {data.map((item, i) => {
          return (
            <div key={i} className="display-cards">
              <img src={item.recipe.image} className="images" alt="food"/> <br />
              <h4>{item.recipe.label}</h4>
            </div>
          );
        })}
      </div>
   </div>
 </>
  );
};

export default Search;