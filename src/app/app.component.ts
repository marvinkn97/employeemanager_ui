import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from './app.domain';
import { EmployeeService } from './employee.service';
import { NavComponent } from './components/nav/nav.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  private employeeService = inject(EmployeeService);
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  constructor(){
    this.fb.group({
      name: [''],
      email: [''],
      jobTitle: [''],
      phone: [''],
      image: ['']
    })
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: Employee[]) => {
      this.employees = response;
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }
}
