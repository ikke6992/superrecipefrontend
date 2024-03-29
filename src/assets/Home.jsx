import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");
            console.table(getRecipes.data);
            setRecipes(getRecipes.data);
        };

        fetchData();
    }, [])

    let index = 0;

    const basicInfo = recipes.map((recipe) => {
        console.table(recipe);
        index++;
    
    const basicInfo = recipes.map((recipe, index) => {
        const link = `/recipe/${recipe.name}`;
        const keywords = recipe.keywords.map(keyword => keyword + ", ");
        return (
            <li key={index}>
                <a href={link}>{recipe.name}</a> - {keywords}
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
