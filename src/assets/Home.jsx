import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");
            setRecipes(getRecipes.data);
        };

        fetchData();
    }, [])
    
    const basicInfo = recipes.map((recipe, index) => {
        const link = `/recipe/${recipe.name}`;
        return (
            <li key={index}>
                <a href={link}>{recipe.name}</a> - {recipe.keywords.replaceAll(",", ", ")}
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
