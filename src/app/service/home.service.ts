import { Injectable } from '@angular/core';
import { PView } from '../../index/mocks-view-board';


@Injectable({
    providedIn: 'root'
})

export class HomeService {

    constructor(
    ) { }

    getView(): any {
        return PView;
    }

}
