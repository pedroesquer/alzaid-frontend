import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient';

// Definimos el tipo que incluye el ID, tal como lo usas en tu componente
type PatientRow = Patient & { id: string };

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // Datos temporales
  private patients: PatientRow[] = [
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
      relativeContactInfo: '644-123-4567',
      weight: 70, height: 1.68, imc: 24.8, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Balanceada', nutritionalNeeds: 'Proteína moderada', alimentaryAllergies: 'Ninguna', medicationAllergies: 'Penicilina'
    },
    {
      id: 'PAC-002',
      name: 'Rosa Martínez Soler',
      age: 79,
      profilePicture: 'https://i.pravatar.cc/80?img=5',
      dementiaType: 'Vascular',
      dementiaStage: 'Inicial',
      dateOfDiagnosis: new Date('2023-01-15'),
      nameOfRelative: 'Juan Martínez',
      relationshipToRelative: 'Hijo',
      relativeContactInfo: '644-876-5432',
      weight: 62, height: 1.55, imc: 25.8, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Baja en sodio', nutritionalNeeds: 'Control de glucosa', alimentaryAllergies: 'Nueces', medicationAllergies: 'Ninguna'
    },
    {
      id: 'PAC-003',
      name: 'Arturo Carmona Ruiz',
      age: 92,
      profilePicture: 'https://i.pravatar.cc/80?img=33',
      dementiaType: 'Cuerpos de Lewy',
      dementiaStage: 'Avanzada',
      dateOfDiagnosis: new Date('2019-11-20'),
      nameOfRelative: 'Elena Ruiz',
      relationshipToRelative: 'Esposa',
      relativeContactInfo: '662-443-2211',
      weight: 68, height: 1.75, imc: 22.2, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Blanda', nutritionalNeeds: 'Suplementos', alimentaryAllergies: 'Mariscos', medicationAllergies: 'Aspirina'
    },
    {
      id: 'PAC-004',
      name: 'Guadalupe Ortiz Paz',
      age: 81,
      profilePicture: 'https://i.pravatar.cc/80?img=41',
      dementiaType: 'Frontotemporal',
      dementiaStage: 'Intermedia',
      dateOfDiagnosis: new Date('2022-08-05'),
      nameOfRelative: 'Roberto Ortiz',
      relationshipToRelative: 'Nieto',
      relativeContactInfo: '644-998-7766',
      weight: 55, height: 1.50, imc: 24.4, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Alta fibra', nutritionalNeeds: 'Hidratación', alimentaryAllergies: 'Lactosa', medicationAllergies: 'Ninguna'
    },
    {
      id: 'PAC-005',
      name: 'Héctor Vega Gómez',
      age: 88,
      profilePicture: 'https://i.pravatar.cc/80?img=11',
      dementiaType: 'Alzheimer',
      dementiaStage: 'Avanzada',
      dateOfDiagnosis: new Date('2018-03-12'),
      nameOfRelative: 'Carmen Vega',
      relationshipToRelative: 'Hija',
      relativeContactInfo: '644-556-7788',
      weight: 75, height: 1.70, imc: 25.9, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Pastosa', nutritionalNeeds: 'Calórica', alimentaryAllergies: 'Ninguna', medicationAllergies: 'Sulfa'
    },
    {
      id: 'PAC-006',
      name: 'Beatriz Salas Cano',
      age: 74,
      profilePicture: 'https://i.pravatar.cc/80?img=26',
      dementiaType: 'Mixta',
      dementiaStage: 'Inicial',
      dateOfDiagnosis: new Date('2024-02-10'),
      nameOfRelative: 'Luis Salas',
      relationshipToRelative: 'Hermano',
      relativeContactInfo: '644-223-3445',
      weight: 58, height: 1.58, imc: 23.2, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Normal', nutritionalNeeds: 'Ninguna', alimentaryAllergies: 'Fresa', medicationAllergies: 'Ninguna'
    },
    {
      id: 'PAC-007',
      name: 'Ricardo Luna Munguía',
      age: 83,
      profilePicture: 'https://i.pravatar.cc/80?img=8',
      dementiaType: 'Parkinson',
      dementiaStage: 'Intermedia',
      dateOfDiagnosis: new Date('2020-06-30'),
      nameOfRelative: 'Sofía Luna',
      relationshipToRelative: 'Hija',
      relativeContactInfo: '662-112-2334',
      weight: 80, height: 1.72, imc: 27.0, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Diabética', nutritionalNeeds: 'Bajo azúcar', alimentaryAllergies: 'Gluten', medicationAllergies: 'Ibuprofeno'
    },
    {
      id: 'PAC-008',
      name: 'Margarita Soto Reales',
      age: 87,
      profilePicture: 'https://i.pravatar.cc/80?img=45',
      dementiaType: 'Alzheimer',
      dementiaStage: 'Avanzada',
      dateOfDiagnosis: new Date('2017-09-15'),
      nameOfRelative: 'Andrés Soto',
      relationshipToRelative: 'Hijo',
      relativeContactInfo: '644-778-8990',
      weight: 52, height: 1.52, imc: 22.5, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Líquida', nutritionalNeeds: 'Espesantes', alimentaryAllergies: 'Ninguna', medicationAllergies: 'Ninguna'
    },
    {
      id: 'PAC-009',
      name: 'Ignacio Téllez Girón',
      age: 80,
      profilePicture: 'https://i.pravatar.cc/80?img=13',
      dementiaType: 'Vascular',
      dementiaStage: 'Intermedia',
      dateOfDiagnosis: new Date('2021-12-01'),
      nameOfRelative: 'Patricia Téllez',
      relationshipToRelative: 'Sobrina',
      relativeContactInfo: '644-445-5667',
      weight: 73, height: 1.65, imc: 26.8, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Hiposódica', nutritionalNeeds: 'Vitamina B12', alimentaryAllergies: 'Huevo', medicationAllergies: 'Ninguna'
    },
    {
      id: 'PAC-010',
      name: 'Elena Fuentes Rocha',
      age: 77,
      profilePicture: 'https://i.pravatar.cc/80?img=32',
      dementiaType: 'Senil',
      dementiaStage: 'Inicial',
      dateOfDiagnosis: new Date('2023-11-20'),
      nameOfRelative: 'Fernando Rocha',
      relationshipToRelative: 'Esposo',
      relativeContactInfo: '662-990-0112',
      weight: 65, height: 1.60, imc: 25.4, corporalMass: 0, muscularMass: 0, boneMass: 0, hipCircumference: 0, dietType: 'Mediterránea', nutritionalNeeds: 'Omega 3', alimentaryAllergies: 'Ninguna', medicationAllergies: 'Lidocaína'
    }
  ];

  constructor() { }

  /**
   * Obtiene la lista de pacientes.
   * Retorna un Observable para simular una petición HTTP real.
   */
  getPatients(): Observable<PatientRow[]> {
    return of(this.patients);
  }

  /**
   * Ejemplo de cómo agregarías un paciente localmente
   */
  addPatient(patient: PatientRow): void {
    this.patients.unshift(patient);
  }
}