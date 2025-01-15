import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './how-to.component.html',
  styleUrl: './how-to.component.scss'
})
export class HowToComponent {

}
