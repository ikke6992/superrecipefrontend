import axios from "axios";
import { useEffect, useState } from "react";

export default function PostRecipe(props) {

    const [res, setRes] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const postRecipe = await axios.post("http://localhost:8080/api/recipes/new", {
                name: props.name
            });
            setRes(`status code: ${postRecipe.status}`)
        }
        fetchData()
    }, [props.name]);

    return (
        <p>{res}</p>
    )

}