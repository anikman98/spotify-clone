import {createContext, useContext, useReducer} from 'react'

export const StateContext = createContext();

export const StateProvider = ({children, initialState, reducer}) => (
    <StateContext.Provider values={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);