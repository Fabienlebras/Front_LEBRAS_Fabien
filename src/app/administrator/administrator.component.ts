import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../services/Administrators_services';
import { Administrators } from '../models/Administrators.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { VaccinationCentersService } from '../services/vaccination_center';


interface CenterOption {
  id: number;
  name: string;
};

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})



export class AdministratorComponent implements OnInit{

  admninistrators: Administrators[] = [];
  searchInput: string = '';
  isAddingAdmninistrator: boolean = false;
  addAdmninistratorForm : FormGroup;
  vaccinationCenters: CenterOption[] = [];
  selectedAdmin:Administrators| null = null;
  modificationForm: FormGroup;

  constructor(private administratorsSerivce: AdministratorService,private formBuilder: FormBuilder,private vaccinationCenterService: VaccinationCentersService) {
    this.addAdmninistratorForm = this.formBuilder.group({
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
      this.loadAdmnistrators();
    }

  loadAdmnistrators(): void {

    this.administratorsSerivce.getAdministrators().subscribe(
      (data) => {
        this.admninistrators = data; 
      },
      (error) => {
        console.error('Erreur lors du chargement des centres de vaccination : ', error);
      }
    );
  }

  toggleAddAdministratorForm(): void {
    this.isAddingAdmninistrator = !this.isAddingAdmninistrator;
    this.loadVaccinationCenters();
    if (!this.isAddingAdmninistrator) {
      this.addAdmninistratorForm.reset();

    }
  }

  addAdministrator(): void {
    if (this.addAdmninistratorForm.valid) {
      const firstName = this.addAdmninistratorForm.get('firstName')?.value || '';
      const lastName = this.addAdmninistratorForm.get('lastName')?.value || '';
      const mail = this.addAdmninistratorForm.get('mail')?.value || '';
      const phone = this.addAdmninistratorForm.get('phone')?.value;
      const id = this.addAdmninistratorForm.get('selectedCenter')?.value;
      this.administratorsSerivce.addAdmnistrator(firstName, lastName, mail,phone,id).subscribe(
        (addedCenter) => {

          
          this.addAdmninistratorForm.reset(); 
          this.isAddingAdmninistrator = false;
  
          this.getAllAdmninistrator();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout d\'un centre de vaccination : ', error);
        }
      );
    
  }
  }


  selectCenterForModification(administrator: Administrators): void {
    this.loadVaccinationCenters();
    this.selectedAdmin = administrator;

    this.modificationForm.setValue({
      firstName: administrator.firstName || '',
      lastName: administrator.lastName || '',
      mail: administrator.mail || '',
      phone: administrator.phone || '',
      selectedCenter:''

    });
  }


  submitModification(): void {
    if (this.modificationForm.valid && this.selectedAdmin) {
      const Admin: Administrators = {

        id: this.selectedAdmin.id,
        firstName: this.modificationForm.get('firstName')?.value || '',
        lastName: this.modificationForm.get('lastName')?.value || '',
        mail: this.modificationForm.get('mail')?.value || '',
        phone:this.modificationForm.get('phone')?.value,
        vaccination_center_id:this.modificationForm.get('selectedCenter')?.value
      };
  
      this.administratorsSerivce.updateVaccinationCenter(Admin).subscribe(
        () => {
         
          this.selectedAdmin = null;
          this.modificationForm.reset();
          this.loadAdmnistrators();
        },
        (error) => {
          console.error('Error updating center:', error);                    
        }
      );
    }
}
  
  getAllAdmninistrator(): void {
    this.loadAdmnistrators(); 
  }

  loadVaccinationCenters(): void {
    this.vaccinationCenterService.getVaccinationCenters().subscribe(
      (data) => {
        this.vaccinationCenters = data.map(center => ({ id: center.id, name: center.name }));
      },
      (error) => {
        console.error('Error loading VaccinationCenters: ', error);
      }
    );
  }


  deleteCenter(centerId: number): void {
    this.administratorsSerivce.deleteAdministrator(centerId).subscribe(
      () => {
          this.getAllAdmninistrator();

      },
      (error) => {
        console.error('Error deleting center:', error);
      }
    );
  }
}
