import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Patient } from '../../models/patient';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { PatientService } from '../../services/patient';

type PatientRow = Patient & { id: string };

@Component({
  selector: 'app-patients-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.css'
})
export class PatientsPage implements OnInit {
  searchTerm: string = '';
  patients: PatientRow[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (data: PatientRow[]) => {
        this.patients = data;
      },
      error: (err: any) => {
        console.error('Error al cargar pacientes:', err);
      }
    });
  }

  get filteredPatients(): PatientRow[] {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) return this.patients;

    return this.patients.filter(p =>
      p.name.toLowerCase().includes(t) ||
      p.id.toLowerCase().includes(t) ||
      p.dementiaType.toLowerCase().includes(t) ||
      p.dementiaStage.toLowerCase().includes(t)
    );
  }

  stageBadgeClass(stage: string): string {
    const s = stage.toLowerCase();
    if (s.includes('inicial')) return 'bg-success-subtle text-success';
    if (s.includes('inter')) return 'bg-warning-subtle text-warning-emphasis';
    if (s.includes('avan')) return 'bg-danger-subtle text-danger';
    return 'bg-secondary-subtle text-secondary';
  }

  // Métodos de acción
  onAddPatient(): void { alert('Agregar paciente'); }
  onView(p: PatientRow): void { alert(`Ver: ${p.name}`); }
  onEdit(p: PatientRow): void { alert(`Editar: ${p.id}`); }
  onDelete(p: PatientRow): void {
    if (!confirm(`¿Eliminar a ${p.name}?`)) return;
    this.patients = this.patients.filter(x => x.id !== p.id);
  }
}