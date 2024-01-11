import { useEffect, useState } from "react";

function Recipe(props) {

    const [recipe, setRecipe] = useState({name: "Frikandellington", ingredients: [
        {ingredient: {name: "Frikandel", category: "Meat", unit: "pieces"}, amount: 5},
        {ingredient: {name: "Bladerdeeg", category: "Carb", unit: "piece"}, amount: 1},
        {ingredient: {name: "Curry", category: "Condiment", unit: "ml"}, amount: 200}
    ], keywords: ["Hollands", "Frituur", "Oven"], instructions: "Frituur de Frikandellen. Doe ze met een beetje curry in het bladerdeeg. Vouw deze dicht. Bak 30 minuten op 220 graden."});

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/")

            getRecipes.data.forEach((getRecipe) =>
                getRecipe.name.toLowerCase().includes(props.recipeName.toLowerCase()) ? setRecipe(getRecipe) : '');
        };

        fetchData();
    }, [])

    const keywords = (recipe.keywords).map(keyword => {
        return (
            keyword + " - "
        )})

    const ingredients = (recipe.ingredients).map(recipeIngredient => {
        return (
            <li>
                {recipeIngredient.amount} {recipeIngredient.ingredient.unit} {recipeIngredient.ingredient.name}
            </li>
        )

    })

    return (
        <>
            <h2>{recipe.name}</h2>
            <p>{keywords}</p>
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

}

export default Recipe;