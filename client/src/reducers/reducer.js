import { setTracks } from '../actions/tracks';
import { combineReducers } from 'redux';
import todos from "./todo";

export default combineReducers({
    setTracks,
    todos
});