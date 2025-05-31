import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-back-to-top-button',
    imports: [
        CommonModule,
        SharedModule
    ],
    templateUrl: './back-to-top-button.component.html',
    styleUrl: './back-to-top-button.component.scss'
})
export class BackToTopButtonComponent {

    @Input() public scrollToTopId: string = ''; 

    public backToTop(): void {
        const scrollableElement: HTMLElement | null = document?.getElementById(this.scrollToTopId);
        if (scrollableElement) {
            scrollableElement.scrollTo({top: 0, behavior: 'smooth'});
        }
    }
}