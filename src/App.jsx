import { useContext, useState } from "react";
import "./App.css";
import { StateContext } from "./assets/StateContext";
import Home from "./assets/Home";
import Recipe from "./assets/Recipe";
import axios from "axios";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./assets/Login";

export default function App() {
  const {state} = useContext(StateContext)
  const [search, setSearch] = useState('');
  const fetchDat = async () => {
    const res = await
      axios.get("http://localhost:8080/api/recipes/search");
    console.log(res.data.sort((a, b) => {
      const distanceA = levenshteinDistance(a, search);
      const distanceB = levenshteinDistance(b, search);
      return distanceA - distanceB;
    }));
  }

  /**
   * Calculates the measure of the difference between two strings
   * @param {String} string1 First string
   * @param {String} string2 Second string
   * @returns {Number} The calculated difference
   */
  function levenshteinDistance(string1, string2) {
    if (!string1.length) return string2.length;
    if (!string2.length) return string1.length;

    const length1 = string1.length;
    const length2 = string2.length;

    const array = Array.from({ length: length1 + 1 }, () =>
      Array(length2 + 1).fill(0));
      
    for (let i = 0; i <= length1; i++) {
      for (let j = 0; j <= length2; j++) {
        if (i === 0) {
          array[i][j] = j;
        } else if (j === 0) {
          array[i][j] = i;
        } else {
          const cost = string1[i - 1] === string2[j - 1] ? 0 : 1;
          array[i][j] = Math.min(
            array[i - 1][j] + 1,
            array[i][j - 1] + 1,
            array[i - 1][j - 1] + cost
          );
        }
      }
    }
    return array[length1][length2];
  }

  return (
    <>
    <header>
      <Login />
    </header>
      <form onSubmit={e => { e.preventDefault(); fetchDat(); }}>
        <input type="text" onChange={e => { setSearch(e.target.value) }} /> <br />
        <button type="submit">Submit</button>
      </form>
      <h1><img src="/garlic-svgrepo-com.svg" alt="Could not load image" width="75" />Super Recipes</h1>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:recipeName" element={<Recipe />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>

  )
}
