
import { combineReducers } from 'redux';
import handleNoti from "./notification";
import handleListFriend from './listfriend';
import handlePopup from './popup';
import handleBanner from './banner-image';
import handleData from './data';
import handleMessage from './message';

export default combineReducers({
    handleNoti,
    handleListFriend,
    handlePopup,
    handleBanner,
    handleData,
    handleMessage
});