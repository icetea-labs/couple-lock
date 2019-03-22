
import { combineReducers } from 'redux';
import handleNoti from "./notification";
import handleListFriend from './listfriend';
import handlePopup from './popup';
import handleBanner from './banner-image';
import handleData from './data';

export default combineReducers({
    handleNoti,
    handleListFriend,
    handlePopup,
    handleBanner,
    handleData,
});