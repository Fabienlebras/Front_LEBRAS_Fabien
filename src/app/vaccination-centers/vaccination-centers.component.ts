import { Component, OnInit } from '@angular/core';
import { VaccinationCenter } from '../models/vaccination-center.model';
import { VaccinationCentersService } from '../services/vaccination_center';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-vaccination-centers',
  templateUrl: './vaccination-centers.component.html',
  styleUrls: ['./vaccination-centers.component.scss'],
})
export class VaccinationCentersComponent implements OnInit {
  vaccinationCenters: VaccinationCenter[] = [];
  searchInput: string = '';
  noCentersFound: boolean = false;
  isAddingCenter: boolean = false;
  addCenterForm: FormGroup;
  selectedCenter: VaccinationCenter | null = null;
  center: any;
  modificationForm: FormGroup;
  noInputMessage: boolean = false;
  modificationMessage: string | null = null;
  deletionMessage: string | null = null;
  addMessage: string | null = null;

  constructor(private VaccinationCentersService: VaccinationCentersService, private formBuilder: FormBuilder) {
    this.addCenterForm = this.formBuilder.group({
      name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
  });

    this.modificationForm = this.formBuilder.group({
      name:['',Validators.required],
      address: ['', Validators.required],
    city: ['', Validators.required],
    })
    
  }
  ngOnInit(): void {
    this.loadVaccinationCenters();

    this.addCenterForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  loadVaccinationCenters(): void {
    this.VaccinationCentersService.getVaccinationCenters().subscribe(
      (data) => {
        this.vaccinationCenters = data;
        this.noCentersFound = this.vaccinationCenters.length === 0; 
        this.resetSearchInput();
        
      },
      (error) => {
        console.error('Erreur lors du chargement des centres de vaccination : ', error);
      }
    );
  }
  searchByCity(): void {
    if (!this.searchInput) {
      this.modificationMessage = '';
      this.deletionMessage='';
      this.addMessage='';
      this.noInputMessage = true; 
      this.noCentersFound = false;
    }
  
    this.VaccinationCentersService.getVaccinationCentersByCity(this.searchInput).subscribe(
      (data) => {
        this.vaccinationCenters = data;
        this.noCentersFound = this.vaccinationCenters.length === 0;
        this.resetSearchInput();
        this.noInputMessage = false; 
      },
      (error) => {
        this.noInputMessage = false; 
      }
    );
  }
  

  getAllCenters(): void {
    this.loadVaccinationCenters(); 
  }

  addCenter(): void {
    if (this.addCenterForm.valid) {
      const newName = this.addCenterForm.get('name')?.value || '';
      const newAddress = this.addCenterForm.get('address')?.value || '';
      const newCity = this.addCenterForm.get('city')?.value || '';
      this.VaccinationCentersService.addVaccinationCenter(newName, newAddress, newCity).subscribe(
        (addedCenter) => {

          this.noCentersFound = false;
          this.addCenterForm.reset(); 
          this.isAddingCenter = false;
          this.noInputMessage = false;
          this.modificationMessage = '';
          this.deletionMessage='';
          this.addMessage='Centre ajouté avec succès';
          this.getAllCenters();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout d\'un centre de vaccination : ', error);
        }
      );
    
  }
  }
  toggleAddCenterForm(): void {
    this.isAddingCenter = !this.isAddingCenter;
    this.modificationMessage = '';
    this.deletionMessage='';
    this.addMessage='';

    if (!this.isAddingCenter) {
      this.addCenterForm.reset();

    }
  }



  deleteCenter(centerId: number): void {
    this.VaccinationCentersService.deleteVaccinationCenter(centerId).subscribe(
      () => {
        this.modificationMessage = '';
        this.addMessage='';
        this.noInputMessage = false; 
        this.deletionMessage = 'Centre supprimé avec succès.';
        this.getAllCenters();

      },
      (error) => {
        console.error('Error deleting center:', error);
      }
    );
  }

  selectCenterForModification(center: VaccinationCenter): void {
    this.selectedCenter = center;
    this.noInputMessage = false; 

    this.modificationForm.setValue({
      name: center.name || '',
      address: center.address || '',
      city: center.city || ''
    });
  }
  submitModification(): void {
    if (this.modificationForm.valid && this.selectedCenter) {
      const modifiedCenter: VaccinationCenter = {

        id: this.selectedCenter.id,
        name: this.modificationForm.get('name')?.value || '',
        address: this.modificationForm.get('address')?.value || '',
        city: this.modificationForm.get('city')?.value || '',
      };
  
      this.VaccinationCentersService.updateVaccinationCenter(modifiedCenter).subscribe(
        () => {
          this.selectedCenter = null;
          this.modificationForm.reset();
          this.modificationMessage = 'Centre modifié avec succès.';
          this.deletionMessage='';
          this.addMessage='';
          this.loadVaccinationCenters();
        },
        (error) => {
          console.error('Error updating center:', error);

          this.loadVaccinationCenters();
                    this.modificationMessage = 'Centre modifié avec succès.';
                    


        }
      );
    }
}
resetSearchInput(): void {
  this.searchInput = '';
  this.noInputMessage = false; 

}
}
  
  
