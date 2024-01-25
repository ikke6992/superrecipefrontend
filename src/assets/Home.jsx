import axios from "axios";
import { useEffect, useState } from "react";
import DisplayRecipeList from "./DisplayRecipeList";

export default function Home() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");
            setRecipes(getRecipes.data);
        };

        fetchData();
    }, [])

    return  (
        <>
            <h2>Try these:</h2>
            <DisplayRecipeList recipes={recipes} />
        </>
    );
}
