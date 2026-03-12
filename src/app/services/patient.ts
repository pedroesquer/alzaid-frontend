import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://alzaid-backend.onrender.com/api/patients';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  createPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }
}