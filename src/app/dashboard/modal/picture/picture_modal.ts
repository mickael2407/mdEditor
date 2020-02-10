import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'picture_modal',
    templateUrl: 'picture_modal.html',
})
export class PictureModal {

    public files: File[];
    constructor(
        public dialogRef: MatDialogRef<PictureModal>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onChange() {
        console.log(this.files);
    }

}