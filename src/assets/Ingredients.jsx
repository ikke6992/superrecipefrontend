import axios from "axios";
import { useEffect, useState } from "react";

export default function Ingredients() {

    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getIngredients = await axios.get("http://localhost:8080/api/ingredients/");
            setIngredients(getIngredients.data);
            const getCategories = await axios.get("http://localhost:8080/api/categories/");
            setCategories(getCategories.data);
            const getUnits = await axios.get("http://localhost:8080/api/units/");
            setUnits(getUnits.data);
        };

        fetchData();
    }, [])

    const basicInfo = ingredients.map((ingredient, index) => {
        console.log(ingredient);
        return (
            <li key={index}>
                {ingredient.name}, Categorie: {ingredient.category.name}, Unit: {ingredient.unit.name}
            </li>
        )
    });

    const submitRecipe = (e) => {
        e.preventDefault();
    }

    const categoryOptions = categories.map((category, index) => {
        return (
            <option key={index} value={category.name}>{category.name}</option>
        )
    })

    const unitOptions = units.map((unit, index) => {
        return (
            <option key={index} value={unit.name}>{unit.name}</option>
        )
    })

    return (
        <>
            <h2>Ingredienten:</h2>
            <ul>
                {basicInfo}
            </ul>
            <form onSubmit={submitRecipe}>
                <label>
                    Naam: <input type='text' placeholder='ingredient' />
                </label><br />
                <label>
                    Categorie: 
                    <select>
                        {categoryOptions}
                    </select>
                </label><br />
                <label>
                    Unit: 
                    <select>
                        {unitOptions}
                    </select>
                </label><br />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}