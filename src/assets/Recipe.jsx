import { useContext, useEffect, useState } from "react";
import { StateContext } from "./StateContext";
import axios from "axios";

function Recipe(props) {

    const [recipe, setRecipe] = useState();
    const {setState} = useContext(StateContext);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");

            getRecipes.data.forEach((getRecipe) => {
                getRecipe.name == props.recipeName ? setRecipe(getRecipe) : '';
            })
        };

        fetchData();
    }, [props.depend])

    if (recipe !== undefined) {
        const ingredients = (recipe.ingredients).map(recipeIngredient => {
            return (
                <li>
                    {recipeIngredient.amount} {recipeIngredient.ingredient.unit} {recipeIngredient.ingredient.name}
                </li>
            )

        })

        return (
            <>
                <button onClick={(e) => {
                        e.preventDefault();
                        setState("home");
                    }}>Home</button>
                <h2>{recipe.name}</h2>
                <p>{recipe.keywords.replaceAll(",", " - ")}</p>
                <br/>
                <ul>
                    {ingredients}
                </ul>
                <br/>
                <p>
                    {recipe.instructions}
                </p>
            </>

        );
    } else {
        return (
            <button onClick={(e) => {
                e.preventDefault();
                setState("home");
            }}>Home</button>
        )
    }

}

export default Recipe;