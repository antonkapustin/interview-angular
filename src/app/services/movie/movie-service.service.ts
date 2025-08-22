import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie.interface';
import { initialMovies } from 'src/data/data';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _movies$ = new BehaviorSubject<Movie[]>(initialMovies);

 
  getMovies(searchName: string = ''): Observable<Movie[]> {
    return this._movies$.pipe(
      delay(500),
      map((m) =>
        m.filter(
          (el) =>
            !searchName.trim() ||
            el.name.toLowerCase().includes(searchName.toLowerCase())
        )
      )
    );
  }

  addMovie(name: string): void {
    const value = this._movies$.getValue();
    const newMovie: Movie = {
      id: value[value.length - 1].id + 1,
      name,
      isOnline: false,
    };
    if (newMovie) {
      this._movies$.next([...this._movies$.getValue(), newMovie]);
    }
  }

  updateMovie(movie: Movie): void {
    const updated = this._movies$
      .getValue()
      .map((m) => (m.id === movie.id ? movie : m));

    this._movies$.next(updated);
  }

  updateAllMovies(value: boolean): void {
    const updated = this._movies$.getValue().map((m) => ({
      ...m,
      isOnline: value,
    }));
    this._movies$.next(updated);
  }

  deleteMovie(id: number): void {
    const updated = this._movies$.getValue().filter((m) => m.id !== id);
    this._movies$.next(updated);
  }
}
