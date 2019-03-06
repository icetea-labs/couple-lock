import { ActionTypes } from '../core/contants';

export function setTracks(tracks){
    return {
        type: ActionTypes.TRACKS_SET,
        tracks
    }
}