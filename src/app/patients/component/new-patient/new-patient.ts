import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-patient.html',
  styleUrl: './new-patient.css'
})
export class NewPatientComponent {

  @Output() cerrar = new EventEmitter<void>();
  @Output() pacienteCreado = new EventEmitter<void>();

  form: FormGroup;

  dementiaStages = ['Leve', 'Moderada', 'Severa'];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      dementiaType: ['', Validators.required],
      dementiaStage: ['', Validators.required],
      diagnosisDate: ['', Validators.required],
      weight: [0],
      height: [0],
      isActive: [true]
    });
  }

  close(): void {
    this.cerrar.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.close();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      fullName: this.form.value.fullName,
      age: Number(this.form.value.age),
      centerId: '1',
      dementiaType: this.form.value.dementiaType,
      dementiaStage: this.form.value.dementiaStage,
      diagnosisDate: this.form.value.diagnosisDate,
      weight: Number(this.form.value.weight),
      height: Number(this.form.value.height),
      isActive: this.form.value.isActive
    };

    this.patientService.createPatient(payload).subscribe({
      next: () => {
        this.pacienteCreado.emit();
        this.close();
      },
      error: (err) => {
        console.error('Error al crear paciente:', err);
      }
    });
  }
}