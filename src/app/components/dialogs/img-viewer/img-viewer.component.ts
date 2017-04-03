import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'dlg-img-viewer',
  // templateUrl: './img-viewer.component.html',
  // styleUrls: ['./img-viewer.component.css']
  template: `
<div class="img-viewer">
  <md-toolbar color="primary">
    <span>Image Type &nbsp; &nbsp;</span>
    <select id="cyPrintType" (change)="onChangeImageType($event.target.value)">
      <option value="png" selected="selected">PNG</option>
      <option value="jpg">JPG</option>
    </select>
    <button md-icon-button mdTooltip="Download" (click)="dialogRef.close(imgType)">
      <md-icon class="md-24"><i class="material-icons">cloud_download</i></md-icon>  
    </button>

    <span class="demo-fill-remaining"></span>

    <button md-icon-button mdTooltip="Close" (click)="dialogRef.close()">
      <md-icon class="md-24"><i class="material-icons">clear</i></md-icon>  
    </button>
  </md-toolbar>
  <div style='border: solid'><img id="cyPrintImg" [src]="imgSrc" /></div>
</div>
  `,  
  styles: [
    '.img-viewer { width:600px; height:500px; }',
    'md-toolbar {	padding: 0 14px; }',
    '.demo-fill-remaining {	flex: 1 1 auto; }',
    '.md-icon-button { min-width: 1%; }',
    'select { background-color: white; }',
    '#cyPrintImg { width: 100%; height: 100% }'
  ]
})
export class ImgViewerComponent implements OnInit {

  public imgType: string = 'png';
  public imgSrc: any = null;

  constructor(public dialogRef: MdDialogRef<ImgViewerComponent>) {
  }

  ngOnInit() {
  }

  onChangeImageType( value: string): void {
    this.imgType = value;
  }
}
