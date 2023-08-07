import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from 'src/app/app.domain';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() employees!: Employee[];

}
