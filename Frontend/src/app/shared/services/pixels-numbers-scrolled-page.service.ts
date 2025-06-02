import { Injectable } from '@angular/core';
import { ScrolledValueMin } from '../../../constants/constants';

@Injectable({
    providedIn: 'root',
})
export class PixelsNumbersScrolledPage {
    public showBackToTopButton: boolean = false;

    public toGetPixelsNumbersScrolled(event: Event): void {
        const scrolledValue: number = (event?.target as HTMLElement)?.scrollTop;

        if (scrolledValue > ScrolledValueMin) {
            this.showBackToTopButton = true;
        } else {
            this.showBackToTopButton = false;
        }
    }
}