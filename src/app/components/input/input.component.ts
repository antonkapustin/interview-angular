import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() placeholder = '';
  @Input() controlName = '';
  @Input() control: FormControl | null = null;

  formControl = new FormControl('');
  constructor(@Host() @Optional() private _parentForm: FormGroupDirective) {}

  ngOnInit(): void {
    this.formControl =
      this.control ||
      (this._parentForm.form.get(this.controlName) as FormControl);
  }
}
