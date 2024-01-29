import axios from "axios";
import { useEffect, useState } from "react";
import DisplayRecipeList from "./DisplayRecipeList";
import PostRecipe from "./PostRecipe";

export default function Home() {

    const [recipes, setRecipes] = useState([]);
    const [recipeName, setRecipeName] = useState('');
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");
            setRecipes(getRecipes.data);
        };

        fetchData();
    }, [])

    const submitRecipe = (e) => {
        e.preventDefault();
        setDisplayForm(true);
    }

    return  (
        <>
            <h2>Try these:</h2>
            <DisplayRecipeList recipes={recipes} />

            <form onSubmit={submitRecipe}>
                <label>
                    Naam: <input
                        type='text'
                        placeholder="recept"
                        value={recipeName}
                        onChange={(e) => {setRecipeName(e.target.value)}} 
                    />
                </label><br />
                <button type='submit'>Submit</button>
            </form>
            {displayForm && <PostRecipe name={recipeName} />}
        </>
    );
}
