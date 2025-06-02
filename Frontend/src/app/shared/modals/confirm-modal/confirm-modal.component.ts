import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SharedModule } from "../../shared.module";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-confirm-modal',
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
    templateUrl: './confirm-modal.component.html',
    styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    public ngOnInit(): void {
        this.dialogRef.addPanelClass(['custom-modal', 'confirm-modal']);
    }

    public close() {
        this.dialogRef.close(true);
    }
}
