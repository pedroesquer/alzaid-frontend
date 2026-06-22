import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../models/patient';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { PatientService } from '../../services/patient';
import { NewPatientComponent } from '../component/new-patient/new-patient';
import { UpdatePatientComponent } from '../component/update-patient/update-patient'; 

@Component({
  selector: 'app-patients-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, NewPatientComponent, UpdatePatientComponent],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.css'
})
export class PatientsPage implements OnInit {

  searchTerm: string = '';
  patients: Patient[] = [];
  showNewPatientForm: boolean = false;

  showUpdatePatientForm: boolean = false;
  selectedPatient: Patient | null = null;

  constructor(
    private patientService: PatientService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    const centerId = localStorage.getItem('centerId');

    if (!centerId) {
      console.error('No se encontro centerId para cargar pacientes.');
      return;
    }

    this.patientService.getPatientsByCenter(centerId).subscribe({
      next: (response: any) => {
        this.patients = response.data ? response.data : response;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
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
    this.cdr.detectChanges();
  }

  onPatientCreated(): void {
    this.showNewPatientForm = false;
    this.loadPatients();
    this.cdr.detectChanges();
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
    this.selectedPatient = { ...p };
    this.showUpdatePatientForm = true;
    this.cdr.detectChanges(); 
  }

  closeUpdatePatientModal(): void {
    this.showUpdatePatientForm = false;
    this.selectedPatient = null;
    this.cdr.detectChanges();
  }

  onPatientUpdated(): void {
    this.closeUpdatePatientModal();
    this.loadPatients();
  }

  onDelete(p: Patient): void {
    console.log('Eliminar paciente:', p);
  }
}