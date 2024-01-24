import axios from "axios";
import { useEffect, useState } from "react";

export default function Ingredients() {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getIngredients = await axios.get("http://localhost:8080/api/ingredients/");
            setIngredients(getIngredients.data);
        };

        fetchData();
    }, [])

    const basicInfo = ingredients.map((ingredient, index) => {
        console.log(ingredient);
        return (
            <li key={index}>
                {ingredient.name}, Categorie: {ingredient.category.name}, Unit: {ingredient.unit}
            </li>
        )
    });

    return (
        <>
            <h2>Ingredienten:</h2>
            <ul>
                {basicInfo}
            </ul>
        </>
    );
}