import { useState } from "react";

function Home() {

    const recipe = {name: "Frikadellington", keywords: ["Keilekker", "Frikadelbroodje"]}
    const [recipes, setRecipes] = useState([recipe]);

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