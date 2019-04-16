
import { combineReducers } from 'redux';
import handleNoti from "./notification";
import handleListChat from './listchat';
import handlePopup from './popup';
import handleBanner from './banner-image';
import handleData from './data';
import handleMessage from './message';

export default combineReducers({
    handleNoti,
    handleListChat,
    handlePopup,
    handleBanner,
    handleData,
    handleMessage
});