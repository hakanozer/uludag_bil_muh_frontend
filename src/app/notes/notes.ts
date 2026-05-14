import { Component } from '@angular/core';
import { SHARED_DIRECTIVES } from '../diretives';

@Component({
  selector: 'app-notes',
  imports: [SHARED_DIRECTIVES],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {}
