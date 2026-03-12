import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Patient } from '../../models/patient';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { PatientService } from '../../services/patient';
import { NewPatientComponent } from '../component/new-patient/new-patient';

@Component({
  selector: 'app-patients-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, NewPatientComponent],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.css'
})
export class PatientsPage implements OnInit {

  searchTerm: string = '';
  patients: Patient[] = [];
  showNewPatientForm: boolean = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
      }
    });
  }

  get filteredPatients(): Patient[] {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) return this.patients;

    return this.patients.filter(p =>
      p.fullName.toLowerCase().includes(t) ||
      p._id.toLowerCase().includes(t) ||
      p.dementiaType.toLowerCase().includes(t) ||
      p.dementiaStage.toLowerCase().includes(t)
    );
  }

  onAddPatient(): void {
    this.showNewPatientForm = true;
  }

  closeNewPatientModal(): void {
    this.showNewPatientForm = false;
    this.loadPatients();
  }

  stageBadgeClass(stage: string): string {
    const s = stage.toLowerCase();
    if (s.includes('leve')) return 'bg-success-subtle text-success';
    if (s.includes('moder')) return 'bg-warning-subtle text-warning-emphasis';
    if (s.includes('sever')) return 'bg-danger-subtle text-danger';
    return 'bg-secondary-subtle text-secondary';
  }

  onView(p: Patient): void {
    console.log('Ver paciente:', p);
  }

  onEdit(p: Patient): void {
    console.log('Editar paciente:', p);
  }

  onDelete(p: Patient): void {
    console.log('Eliminar paciente:', p);
  }
}