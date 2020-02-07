import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'picture_modal',
    templateUrl: 'picture_modal.html',
})
export class PictureModal {

    constructor(
        public dialogRef: MatDialogRef<PictureModal>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}