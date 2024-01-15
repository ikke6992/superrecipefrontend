import { createContext, useState } from "react";

export const StateContext = createContext("home");

export const StateProvider = ({children}) => {
    const [state, setState] = useState("home");

    return (
        <StateContext.Provider value={{state, setState}}>
            {children}
        </StateContext.Provider>
    )  
}