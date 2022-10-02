import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
}

const Reducer = (state, action) => {
    switch(action.type) {
        case reducerCases.SET_TOKEN : {
            return {
                ...state, 
                token:action.token,
            }
        }

        default: return state;
    }
}

export default Reducer;