import { useEffect, useState } from "react";
import axios from "axios";

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

    const recipeList = recipes.map((recipe, index) => {
        const link = `/recipe/${recipe.name}`;
        const keywords = recipe.keywords.map(keyword => keyword + ", ")
        return (
            <li key={index}>
                <a href={link}>{recipe.name}</a> - {keywords}
            </li>
    )});

    return  (
        <>
            <p>{recipes.length} recipes found</p>
            <ul>
                {recipeList}
            </ul>
        </>
    )

}

export default SelectionResults;