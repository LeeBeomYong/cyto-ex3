import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { ImgViewerComponent } from '../components/dialogs/img-viewer/img-viewer.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog){     
  }

  public confirm(imgType: string, imgSrc: any): Observable<boolean> {

    let dialogRef: MdDialogRef<ImgViewerComponent>;

    dialogRef = this.dialog.open(ImgViewerComponent);
    dialogRef.componentInstance.imgType = imgSrc;
    dialogRef.componentInstance.imgSrc = imgSrc;

    return dialogRef.afterClosed();
  }

}
