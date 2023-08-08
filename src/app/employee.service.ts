import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './app.domain';
import { environment } from 'src/environments/environment.development';
import { EmployeeDTO } from './app.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;
  private http = inject(HttpClient);

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}`) ?? [];
  }

  public addEmployee(employeeDTO: EmployeeDTO): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/create`, employeeDTO);
  }

  public updateEmployee(employeeDTO: EmployeeDTO): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/update`, employeeDTO);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${employeeId}`);
  }
}
