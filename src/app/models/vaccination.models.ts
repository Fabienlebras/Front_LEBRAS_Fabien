import { Patient } from "./patient.model";
import { Doctor } from "./Doctor.models";
export class Vaccination {
    id: number;
    patient: Patient;
    vaccinationDate: string;
    validate: boolean;
    doctor:Doctor;
    constructor(id: number, patient: Patient, Date: string, Validate: boolean,doctor:Doctor) {
      this.id = id;
      this.patient = patient;
      this.vaccinationDate = Date;
      this.validate = Validate;
      this.doctor=doctor;
    }
  }