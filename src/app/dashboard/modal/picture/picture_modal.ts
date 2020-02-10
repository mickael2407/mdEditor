import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { StorageService } from 'src/app/service/storage.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
    selector: 'picture_modal',
    templateUrl: 'picture_modal.html',
})
export class PictureModal {

    public file: File;
    constructor(
        private storageService: StorageService,
        public imageService: ImageService,
        public dialogRef: MatDialogRef<PictureModal>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onFileChange(event: File) {
        let reader = new FileReader()
        reader.readAsDataURL(event);
        reader.onload = () => {
            this.imageService.newImage(reader.result, this.storageService.getUserId()).subscribe(
                _res => {
                    console.log(_res);
                },
                _err => {
                    console.log(_err);
                }
            );
        }
    }

}