import { Component, AfterViewInit, ElementRef } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { DialogsService } from './services/dialogs.service';

import { WindowRef } from './services/window-ref';

declare function require(path: string): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Graph Toolbar';
  public result: any;  
  window: any;
  cy_saved: any;

  // Layout Options
  layoutTypes = [
    {
      name: 'grid',
      // cols: 3, rows: 2,
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
      avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true      
    },{
      name: 'random',      
    },{
      name: 'breadthfirst',      
      directed: true,
      roots: '#a'
    },{
      name: 'circle',
      condense: false
    },{
      name: 'cola',  
      condense: false    
    },{
      name: 'concentric',      
      condense: false,
      avoidOverlap: true,
      minNodeSpacing: 10,
      concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return node.degree();
      },
      levelWidth: function( nodes ){ // the variation of concentric values in each level
        return nodes.maxDegree() / 4;
      },
    },{
      name: 'cose',  
      condense: false    
    },{
      name: 'cose-bilkent',      
      condense: false
    },{
      name: 'dagre',
      condense: false
    }
  ];
  selectedLayout = this.layoutTypes[0];

  constructor(
    private eleRef: ElementRef,
    private winRef: WindowRef,
    private dialogsService: DialogsService,
    public dialog: MdDialog
  ) { 
    this.window = winRef.nativeWindow;
  }

  public openCyStyles() {
    if( this.window.cy === undefined ) return;

    this.dialogsService
      .dlgCyStyles(this.window.cy)
      .subscribe(res => this.result = res);
  }

  public openImgViewer() {
    if( this.window.cy === undefined ) return;

    var png64 = this.window.cy.png();    
    this.dialogsService
      .dlgImgViewer('png', png64)
      .subscribe(res => this.result = res);
  }

  ngAfterViewInit(){
    if( this.window.graph === undefined ) this.window.graph = {};
    this.window.graph['title'] = 'EFGH';
    console.log( this.window.graph['title'] );
  }

  changeLayout(): void {
    if( this.window.cy === undefined ) return;
    console.log( "change layout : "+this.selectedLayout.name );

    var layout = this.window.cy.makeLayout(this.selectedLayout);
    layout.run();
    this.window.cy.fit( this.window.cy.elements(), 50 ); // fit to all the layouts
  }

  bfsAnimation(): void {
    if( this.window.cy === undefined ) return;
    var nodes = this.window.cy.$(':selected');
    if( this.window.seledtedNode == null ) return;
    var selectedNode = this.window.seledtedNode;
    console.log( 'BFS start from node#'+selectedNode.id() );
    if( this.window.cy_api !== undefined ){
      this.window.cy_api.removeHighlights();
    }

    var bfs = this.window.cy.elements().bfs('#'+selectedNode.id(), function(){}, true);
    var i = 0;
    var highlightNextEle = function(){
      if( i < bfs.path.length ){
        bfs.path[i].addClass('traveled');      
        i++;
        setTimeout(highlightNextEle, 200);
      }
    };
    // kick off first highlight
    highlightNextEle();
  }

  showAllEle(): void{
    if( this.window.cy_api === undefined ) return;

    this.window.cy_api.show( this.window.cy.elements() );
  }

  exportJSON(): void{
    if( this.window.cy === undefined ) return;

    this.cy_saved = this.window.cy.json();
    console.log( JSON.stringify(this.cy_saved) );
  }

  exportPNG(): void{
    if( this.window.cy === undefined ) return;

    var png64 = this.window.cy.png();
    // $('img#output').attr('src', png64);
    // this.modalService.open('custom-modal-1');
  }

  cyUndo(): void{
    if( this.window.cyUr === undefined ) return;
    this.window.cyUr.undo();
  }
  cyRedo(): void{
    if( this.window.cyUr === undefined ) return;
    this.window.cyUr.redo();
  }
  cyRepaint(): void{
    if( this.window.cy === undefined ) return;
    this.window.cy.fit( this.window.cy.elements(), 50 );
    this.window.cy.resize();
    this.window.cy.forceRender();
  }

  createRandomGraph(): void{
    if( this.window.cy === undefined ) return;

    //입력창
    var inputCntGraph = parseInt(prompt("생성할 노드 갯수를 입력하세요"));//문자열을 숫자로 형변환
    //alert(typeof inputCntGraph);
    
    //모든 그래프 삭제
    this.window.cy.elements().remove();

    //그래프 생성
    var vertex = [];

    for(var i = 0; i < inputCntGraph; i++){
      var temp = { 
        group: "nodes",
        data: {
          id: "n"+i
        },
        position: {
          x: Math.floor((Math.random()*1000)+1),
          y: Math.floor((Math.random()*1000)+1)
        }
      }
      vertex.push(temp);
      //console.log("nodeID:"+temp.data.id+" point("+temp.position.x+" "+temp.position.y+")");
    }
    for(var j = 0; j < inputCntGraph; j++){
      var eTemp = {
        group: "edges",
        data: {
          id: "e"+j,
          source: "n"+Math.floor((Math.random()*inputCntGraph-1)+1),
          target: "n"+Math.floor((Math.random()*inputCntGraph-1)+1)
        }
      }
      vertex.push(eTemp);
      //console.log("edgeID:"+eTemp.data.id+" source:"+eTemp.data.source+" target:"+eTemp.data.target);
    }
    this.window.cy.add(vertex);
    
  }//crateRandomGraph()


  inputCntNode(): void {
    if( this.window.cy === undefined ) return;
    
    let inputCntGraph: any;
    let dialogRef = this.dialog.open(InputNodeCntDialog);
    dialogRef.afterClosed().subscribe(result => {
      inputCntGraph = parseInt(result);
      console.log("inputCntGraph:"+inputCntGraph);

      //모든 그래프 삭제
      this.window.cy.elements().remove();

      //노드 생성
      for(var i = 0; i < inputCntGraph; i++){
        let maxRange: any = inputCntGraph*100;
        let rangeX: any = Math.floor((Math.random()*maxRange)+1);
        let rangeY: any = Math.floor((Math.random()*maxRange/2)+1);
        this.window.cy.add({ 
          group: "nodes",
          data: {
            id: "n"+i
          },
          position: {
            x: rangeX,
            y: rangeY
          }
        });//화면에 추가
        //console.log("nodeID:"+temp.data.id+" point("+temp.position.x+" "+temp.position.y+")");
      }
      //관계 생성
      for(var j = 0; j < inputCntGraph; j++){
        let sourceNum = Math.floor((Math.random()*inputCntGraph-1)+1);
        let targetNum = Math.floor((Math.random()*inputCntGraph-1)+1);
        while(sourceNum === targetNum){
          //console.log(sourceNum+"   "+targetNum);
          targetNum = Math.floor((Math.random()*inputCntGraph-1)+1);
        }
        //console.log("edgeID:"+eTemp.data.id+" source:"+eTemp.data.source+" target:"+eTemp.data.target);
        this.window.cy.add({
            group: "edges",
            data: {
              id: "e"+j,
              source: "n"+sourceNum,
              target: "n"+targetNum
            }
          });//화면에 추가
      }
      this.window.cy.fit();//생성된 모든 노드가 영역에 맞게 화면 맞추기
    });
  }
}

@Component({
  template: `
      <md-input-container>
        <input mdInput #dialogInput maxlength="20" placeholder="노드 갯수는?">
      </md-input-container>
      <button md-raised-button (click)="dialogRef.close(dialogInput.value)">생성하기</button>
  `,
})
export class InputNodeCntDialog{
  constructor(public dialogRef: MdDialogRef<InputNodeCntDialog>){
  }
}
