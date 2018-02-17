import {FETCH_CONSTANT_TYPES} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_CONSTANT_TYPES:
            return action.payload || false;
        default:
            return state;
    }
}