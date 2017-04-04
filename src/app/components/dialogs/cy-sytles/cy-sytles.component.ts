import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import {ColorPickerService} from 'angular2-color-picker';

@Component({
  selector: 'dlg-cy-sytles',
  template: `
<md-dialog-content>
  <md-toolbar color="primary">
    <span>Graph Styles</span>
    <span class="toolbar-fill-remaining"></span>

    <button md-icon-button mdTooltip="Close" (click)="dialogRef.close()">
      <md-icon class="md-24"><i class="material-icons">clear</i></md-icon>  
    </button>
  </md-toolbar>
  <div class="wrap">

    <md-card>
      <md-card-header>
        <md-card-title>Color</md-card-title>
        <md-card-subtitle>Use color-picker</md-card-subtitle>
      </md-card-header>
      <md-card-content>
        <p>Node : &nbsp; &nbsp;
          Color <input style="width:80px" cpOKButton="true" cpCancelButton="true" [(colorPicker)]="nodeColor" [style.background]="nodeColor" [value]="nodeColor" (blur)="onNodeColorChange()"/>
          Size <md-slider min="1" max="5" step="0.5" [value]="nodeSize" (input)="onNodeSizeChange($event.value)"></md-slider>
        </p>
        <p>Edge : &nbsp; &nbsp;
          Color <input style="width:80px" cpOKButton="true" cpCancelButton="true" [(colorPicker)]="edgeColor" [style.background]="edgeColor" [value]="edgeColor" (blur)="onEdgeColorChange()"/>
          Width <md-slider min="1" max="5" step="0.5" [value]="edgeWidth" (input)="onEdgeWidthChange($event.value)"></md-slider>
        </p>
      </md-card-content>
      <md-card-actions align="end">
        <button md-button>Apply</button>
        <button md-button>Cancel</button>
      </md-card-actions>
    </md-card>

  </div>
</md-dialog-content>
  `,
  styles: [
    'md-toolbar {	padding: 0 14px; }',
    '.toolbar-fill-remaining { flex: 1 1 auto; }',
    '.wrap { margin: auto; }'
  ]
})
export class CySytlesComponent implements OnInit {

  public cy: any = null;

  private nodeColor: string = "#12dc20";
  private edgeColor: string = "#127bdc";
  private nodeSize: number = 4;
  private edgeWidth: number = 1;

  constructor(
    public dialogRef: MdDialogRef<CySytlesComponent>, 
    private cpService: ColorPickerService
  ) { }

  ngOnInit() {
  }

  onNodeColorChange(): void{
    console.log( 'color='+this.nodeColor );
    var stringStylesheet = `node { background-color: ${this.nodeColor}; }`;
    this.cy.style( stringStylesheet );
  }
  onEdgeColorChange(): void{
    console.log( 'color='+this.edgeColor );
    var stringStylesheet = `edge { line-color: ${this.edgeColor}; }`;
    this.cy.style( stringStylesheet );
  }

  onNodeSizeChange( value: number ): void{
    console.log( 'size='+value );
    // console.log( this.cy.nodes().style({}) );

    var size = value * 10;
    var stringStylesheet = `node { width: ${size}px; height: ${size}px; background-color: ${this.nodeColor}; }`;
    this.cy.style( stringStylesheet );
  }
  onEdgeWidthChange( value: number ): void{
    console.log( 'width='+value );
    // console.log( this.cy.edges().style() );

    var size = value * 2;
    var stringStylesheet = `edge { width: ${size}px; line-color: ${this.edgeColor}; }`;
    this.cy.style( stringStylesheet );
  }
  
}
