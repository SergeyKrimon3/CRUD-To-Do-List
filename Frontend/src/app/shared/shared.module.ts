import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { CustomSnackbarComponent } from "./components/custom-snackbar/custom-snackbar.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        CustomSnackbarComponent,
        NgxMaskDirective,
        NgxMaskPipe,
    ],
    exports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxMaskDirective,
        NgxMaskPipe,
    ],
    providers: [
        provideNgxMask(),
        CustomSnackbarComponent,
        {
            provide: MatSnackBarRef,
            useValue: {}
        }, {
            provide: MAT_SNACK_BAR_DATA,
            useValue: {}
        },
    ]
})
export class SharedModule { }