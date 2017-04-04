import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ImgViewerComponent } from './components/dialogs/img-viewer/img-viewer.component';
import { CySytlesComponent } from './components/dialogs/cy-sytles/cy-sytles.component';

import { DialogsService } from './services/dialogs.service';

import { WindowRef } from './services/window-ref';

import {ColorPickerModule} from 'angular2-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    ImgViewerComponent,
    CySytlesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ColorPickerModule
  ],
  exports: [
    ImgViewerComponent
  ],
  providers: [
    DialogsService,
    WindowRef
  ],
  entryComponents: [ 
    ImgViewerComponent,
    CySytlesComponent 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
