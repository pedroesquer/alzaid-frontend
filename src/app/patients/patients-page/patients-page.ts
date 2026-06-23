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
  currentPage = 1;
  pageSize = 7;
  showNewPatientForm: boolean = false;

  showUpdatePatientForm: boolean = false;
  selectedPatient: Patient | null = null;
  patientToDelete: Patient | null = null;
  isDeleting = false;

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
        this.currentPage = 1;
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

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredPatients.length / this.pageSize));
  }

  get paginatedPatients(): Patient[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPatients.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
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
    if (s.includes('inicial') || s.includes('leve')) return 'bg-success-subtle text-success';
    if (s.includes('intermedia') || s.includes('moder')) return 'bg-warning-subtle text-warning-emphasis';
    if (s.includes('avanzada') || s.includes('sever')) return 'bg-danger-subtle text-danger';
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
    this.patientToDelete = p;
  }

  closeDeleteModal(): void {
    this.patientToDelete = null;
    this.isDeleting = false;
    this.cdr.detectChanges();
  }

  confirmDelete(): void {
    if (!this.patientToDelete || this.isDeleting) {
      return;
    }

    const patient = this.patientToDelete;
    this.isDeleting = true;

    this.patientService.deletePatient(patient._id).subscribe({
      next: () => {
        console.log('Paciente eliminado:', patient);
        this.closeDeleteModal();
        this.loadPatients();
      },
      error: (err: unknown) => {
        this.isDeleting = false;
        console.error('Error al eliminar paciente:', err);
      }
    });
  }
}
