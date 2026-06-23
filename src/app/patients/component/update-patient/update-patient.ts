import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-patient.html',
  styleUrl: './update-patient.css'
})
export class UpdatePatientComponent implements OnInit {

  @Input() patientData: any; 

  @Output() cerrar = new EventEmitter<void>();
  @Output() pacienteActualizado = new EventEmitter<void>();

  form: FormGroup;
  dementiaStages = ['Inicial', 'Intermedia', 'Avanzada'];
  isSubmitting = false;

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

  ngOnInit(): void {
    if (this.patientData) {
      let formattedDate = this.patientData.diagnosisDate;
      if (formattedDate && formattedDate.includes('T')) {
        formattedDate = formattedDate.split('T')[0];
      }

      this.form.patchValue({
        fullName: this.patientData.fullName,
        age: this.patientData.age,
        dementiaType: this.patientData.dementiaType,
        dementiaStage: this.patientData.dementiaStage,
        diagnosisDate: formattedDate, 
        weight: this.patientData.weight,
        height: this.patientData.height,
        isActive: this.patientData.isActive
      });
    }
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

    const currentCenterId = localStorage.getItem('centerId') || '';

    const payload = {
      ...this.form.value,
      age: Number(this.form.value.age),
      weight: Number(this.form.value.weight),
      height: Number(this.form.value.height),
      centerId: currentCenterId 
    };

    this.patientService.updatePatient(this.patientData._id, payload).subscribe({
      next: () => {
        this.pacienteActualizado.emit();
        this.close();
      },
      error: (err) => {
        console.error('Error al actualizar paciente:', err);
      }
    });
  }
}
