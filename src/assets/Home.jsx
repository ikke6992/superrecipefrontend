import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "./StateContext";

function Home() {

    const {setState} = useContext(StateContext);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");
            setRecipes(getRecipes.data);
        };

        fetchData();
    }, [])

    let index = 0;

    const basicInfo = recipes.map((recipe) => {
        index++;
        return (
            <li key={index}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setState(recipe.name);
                }}>{recipe.name}</button> - {recipe.keywords.replaceAll(",", ", ")}
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