import { useContext, useState } from 'react'
import './App.css'
import { StateContext } from './assets/StateContext'
import Home from './assets/Home'
import Recipe from './assets/Recipe'
import axios from 'axios';

function App() {
  const { state } = useContext(StateContext)
  const [search, setSearch] = useState('');
  const fetchDat = async () => {
    const res = await
      axios.get("http://localhost:8080/api/recipes/search")
    console.log(res.data.sort((a, b) => {
      const distanceA = levenshteinDistance(a, search);
      const distanceB = levenshteinDistance(b, search);
      return distanceA - distanceB;
    }));
  }

  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    const dp = Array.from({ length: m + 1 }, () =>
      Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else {
          const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }
    }
    return dp[m][n];
  }

  return (
    <>
      <header>
        <img className='banner' src="/garlic-svgrepo-com.svg" alt="Could not load image" width={75} />
        <h1>Super Recipes</h1>
        <form className='searchform' onSubmit={e => { e.preventDefault(); fetchDat(); }}>
          <input type='text' onChange={e => { setSearch(e.target.value) }} /> <br />
          <button className='searchbutton' type='submit'>Submit</button>
        </form>
      </header>
      <div>
        {state === "home" && <Home />}
        {state !== "home" && <Recipe recipeName={state} />}
      </div>
    </>

  )
}

export default App
