import { setTracks } from './actions/tracks';
import { combineReducers } from 'redux';
import handleNoti from "./notification";
import handleListFriend from './listfriend';
import handlePopup from './popup';

export default combineReducers({
    handleNoti,
    handleListFriend,
    handlePopup,
});