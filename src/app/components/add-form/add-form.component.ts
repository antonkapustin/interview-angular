import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie/movie-service.service';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-form',
  standalone: true,
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  imports: [CommonModule, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  name = new FormControl('', Validators.required);

  isFormVisible = false;

  constructor(private _movieService: MovieService) {}
  onButtonClick() {
    this.isFormVisible ? this._submitForm() : this._toggleForm();
  }

  private _toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  private _submitForm(): void {
    const name = this.name.value;
    this._movieService.addMovie(name!);
    this._toggleForm();
    this.name.reset();
  }
}
