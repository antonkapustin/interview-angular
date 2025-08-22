import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { MovieService } from 'src/app/services/movie/movie-service.service';
import { Movie } from 'src/app/shared/models/movie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieItemComponent extends BaseComponent implements OnInit {
  @Input() movie!: Movie;

  isOnline = new FormControl<boolean>(false,{nonNullable: true});

  constructor(private _movieService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.isOnline.patchValue(this.movie?.isOnline);
    this._watchChanges();
  }

  delete(): void {
    this._movieService.deleteMovie(this.movie.id);
  }

  private _watchChanges(): void {
    this.isOnline.valueChanges
      .pipe(
        tap((value) =>
          this._movieService.updateMovie({ ...this.movie, isOnline: value })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
