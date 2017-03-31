import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { ImgViewerComponent } from '../components/dialogs/img-viewer/img-viewer.component';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog){     
  }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ImgViewerComponent>;

    dialogRef = this.dialog.open(ImgViewerComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
