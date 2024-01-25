import axios from "axios";
import { useEffect, useState } from "react";
import PostIngredient from "./PostIngredient";

export default function Ingredients() {

    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const [ingredientName, setIngredientName] = useState("");
    const [category, setCategory] = useState("vegetable");
    const [unit, setUnit] = useState("Milliliter");

    const [displayForm, setDisplayForm] = useState(false);

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
        setDisplayForm(true);
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
                    Naam: <input 
                        type='text' 
                        placeholder='ingredient'
                        value={ingredientName}
                        onChange={(e) => {setIngredientName(e.target.value)}} />
                </label><br />
                <label>
                    Categorie: 
                    <select value={category} onChange={(e) => {setCategory(e.target.value)}}>
                        {categoryOptions}
                    </select>
                </label><br />
                <label>
                    Unit: 
                    <select value={unit} onChange={(e) => {setUnit(e.target.value)}}>
                        {unitOptions}
                    </select>
                </label><br />
                <button type='submit'>Submit</button>
            </form>
            {displayForm && <PostIngredient
                ingredientName={ingredientName}
                category={category}
                unit={unit}
                />}
        </>
    );
}