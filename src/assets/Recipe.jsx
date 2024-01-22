import { useContext, useEffect, useState } from "react";
import { StateContext } from "./StateContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Recipe(props) {

    const {recipeName} = useParams();
    const [recipe, setRecipe] = useState();
    const {setState} = useContext(StateContext);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");

            getRecipes.data.forEach((getRecipe) => {
                getRecipe.name == props.recipeName ? setRecipe(getRecipe) : "";
            })
        };

        fetchData();
    }, []);
    let index=0;

    if (recipe) {
        const ingredients = (recipe.ingredients).map(recipeIngredient => {
            console.log(recipeIngredient);
            index++;
            return (
                <li key={index}>
                    {recipeIngredient.amountInUnits} {recipeIngredient.ingredient.name}
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
