import { useEffect, useState } from "react";
import axios from "axios";
import DisplayRecipeList from "./DisplayRecipeList";

function SelectionResults(props) {

    const [recipes, setRecipes] = useState([]);

    
    useEffect(() => {
        if (props.keywords.length !== 0) {
            const fetchData = async () =>  {

                const getRecipes = await axios.get("http://localhost:8080/api/recipes/");

                setRecipes(getRecipes.data.filter(getRecipe => props.keywords.every(keyword => getRecipe.keywords.includes(keyword))));
            }

            fetchData();
        } else {
            setRecipes([]);
        }
    }, [props.keywords])

    return  (
        <>
            <p>{recipes.length} recipes found</p>
            <DisplayRecipeList recipes={recipes} />
        </>
    )

}

export default SelectionResults;