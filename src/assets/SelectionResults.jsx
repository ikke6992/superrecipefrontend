import { useState } from "react";

function SelectionResults(props) {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () =>  {

            const getRecipes = await axios.get("http://localhost:8080/api/recipes/");

            getRecipes.data.forEach((getRecipe) => {
                props.keywords.every(keyword => getRecipe.keywords.includes(keyword)) ? setRecipes(...recipes, getRecipe) : '';
            })
        }

        fetchData();
    }, [])

    let index = 0;

    const recipeList = recipes.map((recipe) => {
        index++;
        return (
            <li key={index}>
                {recipe.name} - {recipe.keywords.replaceAll(",", ", ")}
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