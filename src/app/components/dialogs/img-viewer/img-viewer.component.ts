import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'dlg-img-viewer',
  template: `
<md-dialog-content>
  <md-toolbar color="primary">
    <span>Image Type &nbsp; &nbsp;</span>
    <select id="cyPrintType" (change)="onChangeImageType($event.target.value)">
      <option value="png" selected="selected">PNG</option>
      <option value="jpg">JPG</option>
    </select>
    <button md-icon-button mdTooltip="Download" (click)="dialogRef.close(imgType)">
      <md-icon class="md-24"><i class="material-icons">cloud_download</i></md-icon>  
    </button>

    <span class="toolbar-fill-remaining"></span>

    <button md-icon-button mdTooltip="Close" (click)="dialogRef.close()">
      <md-icon class="md-24"><i class="material-icons">clear</i></md-icon>  
    </button>
  </md-toolbar>
  <div class="wrap"><img [src]="imgSrc" /></div>
</md-dialog-content>
  `,  
  styles: [
    'md-toolbar {	padding: 0 14px; }',
    '.toolbar-fill-remaining {	flex: 1 1 auto; }',
    'select { background-color: white; }',
    '.wrap { border: 1px solid; margin: auto; }',
    'img { max-width: 94%; }'
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
