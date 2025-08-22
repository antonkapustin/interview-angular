import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { Movie } from './shared/models/movie.interface';
import { maxLengthTrimmed } from './shared/utils/maxLength.validator';
import { MovieService } from './services/movie/movie-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  searchFormControl = new FormControl<string>('', maxLengthTrimmed(3));
  items$: Observable<Movie[]> = this.searchFormControl.valueChanges.pipe(
    startWith(''),
    debounceTime(500),
    distinctUntilChanged(),
    map((value) => value?.trim()),
    filter(
      (value) => value === '' || this.searchFormControl.hasError('maxlength')
    ),
    switchMap((value) => this._movieService.getMovies(value!))
  );

  constructor(private _movieService: MovieService) {}
}
