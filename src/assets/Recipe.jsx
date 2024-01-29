import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Recipe(props) {

    const {recipeName} = useParams();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");

            getRecipes.data.forEach((getRecipe) => {
                getRecipe.name == recipeName ? setRecipe(getRecipe) : "";
            })
        };

        fetchData();
    }, []);

    if (recipe) {
        const ingredients = (recipe.ingredients).map((recipeIngredient, index) => {
            return (
                <li key={index}>
                    {recipeIngredient.amountInUnits} {recipeIngredient.ingredient.name}
                </li>
            )

        })

        return (
            <>
                <a href="/">Home</a>
                <h2>{recipe.name}</h2>
                <input type='checkbox'/>
                <img className="recipe-image" src={`data:image/jpeg;base64,${recipe.image}`} />
                <p>{recipe.keywords.join(" - ")}</p>
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
            <a href="/">Home</a>
        )
    }

}
