import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { VaccinationCenter } from '../models/vaccination-center.model';
import { Doctor } from '../models/Doctor.models';
import { DoctorService } from '../services/Doctor_service';
import { VaccinationCentersService } from '../services/vaccination_center';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent {
  isAddingDoctor:boolean = false;
  addDoctorForm: FormGroup;
  vaccinationCenters: VaccinationCenter[]=[];
  modificationForm: FormGroup;
  selectedDoctor:Doctor| null = null;
  doctors:Doctor[]=[];


  constructor(private doctorService: DoctorService,private formBuilder: FormBuilder,private vaccinationCenterService: VaccinationCentersService) {
    this.addDoctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mail: ['', Validators.required],
    phone: ['', Validators.required],
    selectedCenter: ['', Validators.required] 


  });

  this.modificationForm = this.formBuilder.group({

    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mail: ['', Validators.required],
    phone: ['', Validators.required],
    selectedCenter: ['', Validators.required]


  })
  }
  ngOnInit(): void {
    this.loadDoctor();
  }
  loadDoctor(): void {

    this.doctorService.getDoctor().subscribe(
      (data) => {
        this.doctors = data; 
      },
      (error) => {
        console.error('Erreur lors du chargement des centres de vaccination : ', error);
      }
    );
  }

  loadVaccinationCenters(): void {
    this.vaccinationCenterService.getVaccinationCenters().subscribe(
      (data) => {
        this.vaccinationCenters = data.map(center => ({ id: center.id, name: center.name,city:center.city,address:center.address }));
      },
      (error) => {
        console.error('Error loading VaccinationCenters: ', error);
      }
    );
  }

  toggleAddDoctorForm():void{
    this.isAddingDoctor = !this.isAddingDoctor;
    this.loadDoctor();
    this.loadVaccinationCenters();
    if (!this.isAddingDoctor) {
      this.addDoctorForm.reset();

    }


   }

   addDoctor(): void {
    if (this.addDoctorForm.valid) {
      const firstName = this.addDoctorForm.get('firstName')?.value || '';
      const lastName = this.addDoctorForm.get('lastName')?.value || '';
      const mail = this.addDoctorForm.get('mail')?.value || '';
      const phone = this.addDoctorForm.get('phone')?.value;
      const id = this.addDoctorForm.get('selectedCenter')?.value;
      this.doctorService.addDoctor(firstName, lastName, mail,phone,id).subscribe(
        (addedCenter) => {

          
          this.addDoctorForm.reset(); 
          this.isAddingDoctor = false;
  
          this.loadDoctor();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout d\'un centre de vaccination : ', error);
        }
      );
    
  }
  }

  selectDoctorForModification(doctor: Doctor){
    this.loadVaccinationCenters();
    this.selectedDoctor = doctor;

    this.modificationForm.setValue({
      firstName: doctor.firstName || '',
      lastName: doctor.lastName || '',
      mail: doctor.mail || '',
      phone: doctor.phone || '',
      selectedCenter:doctor.vaccinationCenter.id

    });
  }

  deleteDoctor(centerId: number): void {
    this.doctorService.deleteDoctor(centerId).subscribe(
      () => {
          this.loadDoctor();

      },
      (error) => {
        console.error('Error deleting center:', error);
      }
    );
  }
  

  submitModification(): void {
    if (this.modificationForm.valid && this.selectedDoctor) {
      const doctor: Doctor = {

        id: this.selectedDoctor.id,
        firstName: this.modificationForm.get('firstName')?.value || '',
        lastName: this.modificationForm.get('lastName')?.value || '',
        mail: this.modificationForm.get('mail')?.value || '',
        phone:this.modificationForm.get('phone')?.value,
        vaccinationCenter:this.modificationForm.get('selectedCenter')?.value
      };
  
      this.doctorService.updateDoctor(doctor).subscribe(
        () => {
         
       
        },
        (error) => {
          console.error('Error updating center:', error);     
          this.selectedDoctor = null;
          this.modificationForm.reset();
          this.loadDoctor();               
        }
      );
    }
}}

