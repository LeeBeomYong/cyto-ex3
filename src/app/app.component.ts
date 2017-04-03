import { Component, AfterViewInit, ElementRef } from '@angular/core';

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
    private dialogsService: DialogsService
  ) { 
    this.window = winRef.nativeWindow;
  }

  public openDialog() {
    if( this.window.cy === undefined ) return;

    var png64 = this.window.cy.png();    
    this.dialogsService
      .confirm('png', png64)
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
    this.window.cy.forceRender();
  }
  
}
