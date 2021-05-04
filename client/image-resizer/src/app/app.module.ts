import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexModule} from '@angular/flex-layout';
import { UploadBoxComponent } from './components/upload-box/upload-box.component';
import { SizeSelectorComponent } from './components/size-selector/size-selector.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {MatRadioModule} from '@angular/material/radio';
import {MaterialFileInputModule} from 'ngx-material-file-input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadBoxComponent,
    SizeSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    MaterialFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
