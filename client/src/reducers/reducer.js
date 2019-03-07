import { setTracks } from './actions/tracks';
import { combineReducers } from 'redux';
import handleNoti from "./notification";

export default combineReducers({
    setTracks,
    handleNoti
});