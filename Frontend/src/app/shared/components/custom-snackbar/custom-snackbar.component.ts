import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackbarDuration, SnackBarTheme } from '../../models/snackbar.model';
import { MaterialModule } from '../../material/material.module';

@Component({
    selector: 'app-custom-snackbar',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule
    ],
    templateUrl: './custom-snackbar.component.html',
    styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent implements OnInit {

    private readonly snackBar = inject(MatSnackBar);
    private readonly translate = inject(TranslateService);
    public theme: SnackBarTheme = SnackBarTheme.default;
    public message: string = '';

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; theme: SnackBarTheme },
    ) { }

    public ngOnInit(): void {
        if (this.data) {
            this.message = this.data.message || '';
            this.theme = this.data.theme || SnackBarTheme.default;
        }
    }

    public open(message: string, theme?: SnackBarTheme, duration?: number): void {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
                message: message,
                theme: theme,
            },
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: duration || SnackbarDuration.DEFAULT_DURATION,
            panelClass: 'custom-snackbar',
        });


        //To hide snackbar because snakbar.dismiss and duration not worked.
        const snackBarElement: Element | null = document.querySelector('.custom-snackbar');
        if (snackBarElement) {
            setTimeout(() => {
                snackBarElement.remove();
            }, duration || SnackbarDuration.DEFAULT_DURATION);
        }
    }
}