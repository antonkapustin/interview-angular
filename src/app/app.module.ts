import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './components/add-form/add-form.component';
import { InputComponent } from './components/input/input.component';
import { CardComponent } from './components/card/card.component';
import { MoviesModule } from './shared/movies/movies.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddFormComponent,
    CardComponent,
    InputComponent,
    MoviesModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
