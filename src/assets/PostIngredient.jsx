import axios from "axios";
import { useEffect, useState } from "react";

export default function PostIngredient(props) {
    console.log(props.ingredientName);
    console.log(props.category);
    console.log(props.unit);

    const [res, setRes] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const postIngredient = await axios.post("http://localhost:8080/api/ingredients/new", {
                name: props.ingredientName,
                category: props.category,
                unit: props.unit
            });
            console.log(postIngredient);
            setRes(`status code: ${postIngredient.status}`)
        }
        fetchData();
        console.log(res);
    }, [props.ingredientName]);

    return (
        <p>{res}</p>
    );
}