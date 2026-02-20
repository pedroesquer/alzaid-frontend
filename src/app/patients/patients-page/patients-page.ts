import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Patient } from '../../models/patient';

type PatientRow = Patient & { id: string };

@Component({
  selector: 'app-patients-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.css'
})
export class PatientsPage {
  searchTerm = '';

  patients: PatientRow[] = [
    {
      id: 'PAC-001',
      name: 'Daniel López López',
      age: 85,
      profilePicture: 'https://i.pravatar.cc/80?img=12',
      dementiaType: 'Alzheimer',
      dementiaStage: 'Intermedia',
      dateOfDiagnosis: new Date('2021-05-10'),
      nameOfRelative: 'María López',
      relationshipToRelative: 'Hija',
      relativeContactInfo: '55-1234-5678',
      weight: 70,
      height: 1.68,
      imc: 24.8,
      corporalMass: 0,
      muscularMass: 0,
      boneMass: 0,
      hipCircumference: 0,
      dietType: 'Balanceada',
      nutritionalNeeds: 'Proteína moderada',
      alimentaryAllergies: 'Ninguna',
      medicationAllergies: 'Penicilina'
    }
  ];

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

  onAddPatient() { alert('Agregar paciente'); }
  onView(p: PatientRow) { alert(`Ver ${p.id}`); }
  onEdit(p: PatientRow) { alert(`Editar ${p.id}`); }
  onDelete(p: PatientRow) {
    if (!confirm(`¿Eliminar a ${p.name}?`)) return;
    this.patients = this.patients.filter(x => x.id !== p.id);
  }
}