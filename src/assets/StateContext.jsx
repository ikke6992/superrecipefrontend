import { createContext, useState } from "react";

const StateContext = createContext("home");

const StateProvider = ({children}) => {
    const [state, setState] = useState("home");

    return (
        <StateContext.Provider value={{state, setState}}>
            {children}
        </StateContext.Provider>
    )  
}

export {StateProvider, StateContext};