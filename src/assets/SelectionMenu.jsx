import axios from "axios";
import { useEffect, useState } from "react";
import SelectionResults from "./SelectionResults";

function SelectionMenu() {

    const [keywords, setKeywords] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            const getKeywords = await axios.get("http://localhost:8080/api/keywords/");
            setKeywords(getKeywords.data);
        };

        fetchData();
    }, [])

    const checkHandler = () => {
        setIsChecked(!isChecked);
    }

    let index = 0;

    const keywordChecklist = keywords.map((keyword) => {
        index++;
        return (
            <div key={index}>
                <input 
                    id={`checkbox-${index}`} 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={checkHandler} 
                />
                <label htmlFor={`checkbox-${index}`}>{keyword}</label>
            </div>
        )
    });

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                setDisplayForm(true);
            }}>
                {keywordChecklist}
                <button type='submit'>Submit</button>
            </form>
    
            {displayForm && <SelectionResults keywords=""/>}
        </>
    )
}

export default SelectionMenu;