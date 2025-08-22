import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { MovieService } from 'src/app/services/movie/movie-service.service';
import { Movie } from 'src/app/shared/models/movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent extends BaseComponent implements OnInit  {
  @Input() movies!: Movie[]

  choseAll = new FormControl<boolean>(false);

  constructor(private _movieService: MovieService) {
    super()
  }

  ngOnInit(): void {
    this._watchChanges();
  }

  private _watchChanges():void {
    this.choseAll.valueChanges.pipe(
      tap((value => this._movieService.updateAllMovies(value!))),
      takeUntil(this.destroy$)
    ).subscribe()
  }
}
