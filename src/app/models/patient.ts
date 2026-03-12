export interface Patient {
  _id: string;
  fullName: string;
  age: number;
  centerId: string;
  dementiaType: string;
  dementiaStage: string;
  diagnosisDate: string;
  weight: number;
  height: number;
  bmi: number;
  isActive: boolean;
}