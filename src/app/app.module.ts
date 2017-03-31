import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ImgViewerComponent } from './components/dialogs/img-viewer/img-viewer.component';

import { DialogsService } from './services/dialogs.service';

import { WindowRef } from './services/window-ref';

@NgModule({
  declarations: [
    AppComponent,
    ImgViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  exports: [
    ImgViewerComponent
  ],
  providers: [
    DialogsService,
    WindowRef
  ],
  entryComponents: [ 
    ImgViewerComponent 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
