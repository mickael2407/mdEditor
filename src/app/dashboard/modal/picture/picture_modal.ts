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

    onFileChange(event: File[]) {
        console.log(event);
        event.forEach(_file => {
            let reader = new FileReader()
            reader.readAsDataURL(_file);
            reader.onload = () => {
                console.log(reader.result);
            }
        });
    }

}