import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { patientService } from '../services/patients_service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  searchInput: string = '';
  isAddingPatient: boolean = false;
  addPatientForm: FormGroup;
  modificationForm: FormGroup;
  selectedPatient: Patient | null = null;

  constructor(private patientService: patientService, private formBuilder: FormBuilder) {
    this.addPatientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.modificationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPatient();
  }

  loadPatient(): void {
    this.patientService.getPatient().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error loading patients: ', error);
      }
    );
  }

  toggleAddPatientForm(): void {
    this.isAddingPatient = !this.isAddingPatient;
    this.loadPatient();
    if (!this.isAddingPatient) {
      this.addPatientForm.reset();

    }
  }

  addPatient(): void {
    if (this.addPatientForm.valid) {
      const firstName = this.addPatientForm.get('firstName')?.value || '';
      const lastName = this.addPatientForm.get('lastName')?.value || '';
      const mail = this.addPatientForm.get('mail')?.value || '';
      const phone = this.addPatientForm.get('phone')?.value;
      this.patientService.addPatient(firstName, lastName, mail,phone).subscribe(
        (addedCenter) => {

          
          this.addPatientForm.reset(); 
          this.isAddingPatient = false;
  
          this.getAllPatient();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout d\'un centre de vaccination : ', error);
        }
      );
    
  }
  }

  getAllPatient(): void {
    this.loadPatient(); 
  }

  selectPatientForModification(patient: Patient): void {
    this.selectedPatient = patient;

    this.modificationForm.setValue({
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      mail: patient.mail || '',
      phone: patient.phone || '',

    });
  }

  deletePatient(patientId: number): void {
    this.patientService.deletePatient(patientId).subscribe(
      () => {
          this.getAllPatient();

      },
      (error) => {
        console.error('Error deleting center:', error);
      }
    );
  }
  submitModification(): void {
    if (this.modificationForm.valid && this.selectedPatient) {
      const patient: Patient = {

        id: this.selectedPatient.id,
        firstName: this.modificationForm.get('firstName')?.value || '',
        lastName: this.modificationForm.get('lastName')?.value || '',
        mail: this.modificationForm.get('mail')?.value || '',
        phone:this.modificationForm.get('phone')?.value,
        
      };
      this.patientService.updatePatient(patient).subscribe(
        () => {
        },
        (error) => {
          console.error('Error updating center:', error);      
          this.selectedPatient = null;
          this.modificationForm.reset();

          this.loadPatient();
             
        }
      );
    }
}
}
