import { HomeComponent } from './components/home/home.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from './app.domain';
import { EmployeeService } from './employee.service';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }
    );
  }
}
