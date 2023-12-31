import { useState } from "react";

function Home() {

    const recipe = {name: "Frikandellington", keywords: ["Keilekker", "Frikandelbroodje"]}
    const recipe2 = {name: "Pizza banaan", keywords: ["Gadverdamme", "Nog erger dan Hawaii"]}
    const [recipes, setRecipes] = useState([recipe, recipe2]);

    //TODO: get recipes from database

    const basicInfo = recipes.map(recipe => {
        return (
            <li>
                {recipe.name} - {(recipe.keywords).map(keyword => {
                    console.log(keyword);
                    return (keyword) + ", ";
                })}
            </li>
    )});

    return  (
        <>
            <h2>Try these:</h2>
            <ul>
                {basicInfo}
            </ul>
        </>
    );
}

export default Home;