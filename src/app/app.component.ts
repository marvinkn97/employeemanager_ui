import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from './app.domain';
import { EmployeeService } from './employee.service';
import { NavComponent } from './components/nav/nav.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDTO } from './app.dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavComponent, ReactiveFormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  data: boolean = false;
  private employeeService = inject(EmployeeService);
  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    id: [''],
    name: [''],
    email: [''],
    jobTitle: [''],
    phone: [''],
    image: [''],
  });

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: Employee[]) => {
      this.employees = response;
      this.data = true;
    });
  }

  open(targetModal: any) {
    this.modalService
      .open(targetModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }

  submitForm() {
    let employeeDTO = new EmployeeDTO(
      this.form.value.name,
      this.form.value.email,
      this.form.value.jobTitle,
      this.form.value.phone,
      this.form.value.image
    );
    this.employeeService.addEmployee(employeeDTO);
  }
}
