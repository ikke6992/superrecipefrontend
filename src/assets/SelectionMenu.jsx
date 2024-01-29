import axios from "axios";
import { useEffect, useState } from "react";
import SelectionResults from "./SelectionResults";

function SelectionMenu() {

    const [keywords, setKeywords] = useState([]);
    const [trueKeywords, setTrueKeywords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const getKeywords = await axios.get("http://localhost:8080/api/keywords/");
            setKeywords(getKeywords.data.map(keyword => {
                return (
                    {name: keyword, checked: false}
                )
            }))

        };

        fetchData();
    }, [])

    const Checkbox = ({ isChecked, label, checkHandler, index }) => {
        return (
            <div>
                <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={isChecked}
                    onChange={checkHandler}
                />
                <label htmlFor={`checkbox-${index}`}>{label}</label>
            </div>
        )
    }

    const updateCheckStatus = index => {
        setKeywords(
            keywords.map((keyword, currentIndex) => 
                currentIndex === index
                    ? {...keyword, checked: !keyword.checked }
                    : keyword
            )
        )
    }

    const updateCheckedKeywords = (e) => {
        e.preventDefault();
        setTrueKeywords(keywords.filter(keyword => keyword.checked).map(keyword => keyword.name));
    }

    return (
        <>
            <form onSubmit={updateCheckedKeywords}>
                <div className="checklist">
                    {keywords.map((keyword, index) => (
                        <Checkbox
                            key={keyword.name}
                            isChecked={keyword.checked}
                            checkHandler={() => updateCheckStatus(index)}
                            label={keyword.name}
                            index={index}
                        />
                    ))}
                </div>
                <button type='submit'>Submit</button>
            </form>
    
            <SelectionResults keywords={trueKeywords} />
        </>
    )
}

export default SelectionMenu;