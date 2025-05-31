import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { CustomSnackbarComponent } from "./components/custom-snackbar/custom-snackbar.component";
import { MenuComponent } from "./components/menu/menu.component";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        CustomSnackbarComponent,
    ],
    exports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    providers: [
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