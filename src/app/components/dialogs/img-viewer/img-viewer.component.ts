import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'dlg-img-viewer',
  // templateUrl: './img-viewer.component.html',
  // styleUrls: ['./img-viewer.component.css']
  template: `
      <p>{{ title }}</p>
      <p>{{ message }}</p>
      <button type="button" md-raised-button 
          (click)="dialogRef.close(true)">OK</button>
      <button type="button" md-button 
          (click)="dialogRef.close()">Cancel</button>
  `,  
  styles: []
})
export class ImgViewerComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ImgViewerComponent>) {
  }

  ngOnInit() {
  }

}
