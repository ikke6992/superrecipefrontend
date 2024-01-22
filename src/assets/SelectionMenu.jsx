import axios from "axios";
import { useEffect, useState } from "react";
import SelectionResults from "./SelectionResults";

function SelectionMenu() {

    const [keywords, setKeywords] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);

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

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                setDisplayForm(true);
            }}>
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
    
            {displayForm && <SelectionResults keywords={keywords.filter(keyword => keyword.checked).map(keyword => keyword.name)} />}
        </>
    )
}

export default SelectionMenu;