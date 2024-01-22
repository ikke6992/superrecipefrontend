import { useEffect, useState } from "react";
import axios from "axios";

function SelectionResults(props) {

    console.log(props.keywords);

    const [recipes, setRecipes] = useState([]);

    
    useEffect(() => {
        if (props.keywords.length !== 0) {
            const fetchData = async () =>  {

                const getRecipes = await axios.get("http://localhost:8080/api/recipes/");

                getRecipes.data.forEach((getRecipe) => {
                    console.log(props.keywords.every(keyword => getRecipe.keywords.includes(keyword)))
                    props.keywords.every(keyword => getRecipe.keywords.includes(keyword)) ? setRecipes([...recipes, getRecipe]) : '';
                })
            }

            fetchData();
        }
    }, [])

    const recipeList = recipes.map((recipe, index) => {
        const link = `/recipe/${recipe.name}`;
        return (
            <li key={index}>
                <a href={link}>{recipe.name}</a> - {recipe.keywords.replaceAll(",", ", ")}
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