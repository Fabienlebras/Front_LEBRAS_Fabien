import { Component } from '@angular/core';
import { Vaccination } from '../models/vaccination.models';
import { VaccinationService } from '../services/Vaccination_Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { OnInit } from '@angular/core';
import { patientService } from '../services/patients_service';
import { Patient } from '../models/patient.model';
import { DoctorService } from '../services/Doctor_service';
import {Doctor} from '../models/Doctor.models';
@Component({
  selector: 'app-vaccinationlist',
  templateUrl: './vaccinationlist.component.html',
  styleUrls: ['./vaccinationlist.component.scss']
})
export class VaccinationlistComponent implements OnInit{

  vaccinations: Vaccination[] = [];
  searchInput: string = '';
  isAddingVaccination: boolean = false;
  addVaccinationForm : FormGroup;
  selectedVaccin:Vaccination| null = null;
  modificationForm: FormGroup;
  patients: Patient[] = [];
  doctors: Doctor[]= [];
  constructor(private vaccinationService: VaccinationService,private formBuilder: FormBuilder,private patientService: patientService,private doctorService: DoctorService) {
    this.addVaccinationForm = this.formBuilder.group({
    selectedDoctor: ['', Validators.required],
    selectedPatient: ['', Validators.required],
    Validate: ['', Validators.required], // Nouveau contrôle pour le sélecteur
    registrationDate:['',Validators.required]


  });

  this.modificationForm = this.formBuilder.group({

    selectedDoctor: ['', Validators.required],
    selectedPatient: ['', Validators.required],
    Validate: ['', Validators.required],
    registrationDate:['',Validators.required]

  })
  }
    ngOnInit(): void {
      this.loadVaccination();
    }

  loadVaccination(): void {

    this.vaccinationService.getVaccination().subscribe(
      (data) => {
        this.vaccinations = data; 
        console.log(this.vaccinations);       
      },
      (error) => {
        console.error('Erreur lors du chargement des centres de vaccination : ', error);
      }
    );
  }

  loadDoctors(): void {

    this.doctorService.getDoctor().subscribe(
      (data) => {
        this.doctors = data; 
        console.log(this.vaccinations);       
      },
      (error) => {
        console.error('Erreur lors du chargement des centres de vaccination : ', error);
      }
    );
  }

  
  Validate(vaccination:Vaccination):void{
    this.vaccinationService.Validate(vaccination).subscribe(   (data) => {
    this.vaccinations = data; 
    this.loadVaccination();
    },
    (error) => {
      console.error('Erreur lors du chargement des centres de vaccination : ', error);
    }
  );

  
  
    
  }


  loadPatient(): void {
    this.patientService.getPatient().subscribe(
      (data) => {
        // Créer un tableau avec des éléments nom + id
        this.patients = data.map(patient => ({ id: patient.id, firstName: patient.firstName,lastName:patient.lastName,mail:patient.mail,phone:patient.phone }));
      },
      (error) => {
        console.error('Error loading VaccinationCenters: ', error);
      }
    );
  }

  addVaccin(): void {
    console.log("a");
    if (this.addVaccinationForm.valid) {
      const patient = this.addVaccinationForm.get('selectedPatient')?.value || '';
      const vaccinationDate = this.addVaccinationForm.get('registrationDate')?.value || '';
      const validate = this.addVaccinationForm.get('Validate')?.value || '';
      const doctor = this.addVaccinationForm.get('selectedDoctor')?.value;
      const id = this.addVaccinationForm.get('selectedDoctor')?.value;
      
      this.vaccinationService.addVaccin(id, patient, vaccinationDate,doctor,validate).subscribe(
        (addedCenter) => {

          
          this.addVaccinationForm.reset(); // Reset the form after successful addition
          this.isAddingVaccination = false;
  
          this.loadVaccination();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout d\'un centre de vaccination : ', error);
        }
      );
    
  }
  }

  toggleAddVaccinForm(): void {
    this.isAddingVaccination = !this.isAddingVaccination;
    this.loadVaccination();
    this.loadPatient();
    this.loadDoctors();
    // Réinitialiser le formulaire si on passe de l'état ajout à non ajout
    if (!this.isAddingVaccination) {
      this.addVaccinationForm.reset();

    }
  }
  deleteVaccin(patientId: number): void {
    // Call the service method to delete the center
    this.vaccinationService.deleteVaccin(patientId).subscribe(
      () => {
        // Handle success, maybe update the list of centers
          this.loadVaccination();

      },
      (error) => {
        // Handle error
        console.error('Error deleting center:', error);
      }
    );
  }
}