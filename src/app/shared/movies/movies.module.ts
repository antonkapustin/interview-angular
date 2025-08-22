import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { InputComponent } from 'src/app/components/input/input.component';

@NgModule({
  declarations: [MovieItemComponent, MovieListComponent],
  imports: [CommonModule, ReactiveFormsModule, AddFormComponent, CardComponent, InputComponent],
  exports: [MovieListComponent]
})
export class MoviesModule {}
