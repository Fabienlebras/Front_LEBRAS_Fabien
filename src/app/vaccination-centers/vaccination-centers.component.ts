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

    // Initialisez le formulaire réactif
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
        this.noCentersFound = this.vaccinationCenters.length === 0; // Mettez à jour la variable en fonction du résultat
        this.resetSearchInput();
        
      },
      (error) => {
        console.error('Erreur lors du chargement des centres de vaccination : ', error);
      }
    );
  }
  searchByCity(): void {
    // Check if searchInput is empty
    if (!this.searchInput) {
      this.modificationMessage = '';
      this.deletionMessage='';
      this.addMessage='';
      this.noInputMessage = true; // Show the message
      this.noCentersFound = false;
      return; // Exit the function without making the API call
    }
  
    // If searchInput is not empty, proceed with the API call
    this.VaccinationCentersService.getVaccinationCentersByCity(this.searchInput).subscribe(
      (data) => {
        this.vaccinationCenters = data;
        this.noCentersFound = this.vaccinationCenters.length === 0;
        this.resetSearchInput();
        this.noInputMessage = false; // Hide the message on successful search
      },
      (error) => {
        console.error('Erreur lors de la recherche des centres de vaccination par ville : ', error);
        this.noInputMessage = false; // Hide the message on error
      }
    );
  }
  

  getAllCenters(): void {
    this.loadVaccinationCenters(); // Utilisez la méthode existante pour charger tous les centres
  }

  addCenter(): void {
    if (this.addCenterForm.valid) {
      const newName = this.addCenterForm.get('name')?.value || '';
      const newAddress = this.addCenterForm.get('address')?.value || '';
      const newCity = this.addCenterForm.get('city')?.value || '';
      this.VaccinationCentersService.addVaccinationCenter(newName, newAddress, newCity).subscribe(
        (addedCenter) => {

          this.noCentersFound = false;
          this.addCenterForm.reset(); // Reset the form after successful addition
          this.isAddingCenter = false;
          this.noInputMessage = false; // Show the message
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

    // Réinitialiser le formulaire si on passe de l'état ajout à non ajout
    if (!this.isAddingCenter) {
      this.addCenterForm.reset();

    }
  }



  deleteCenter(centerId: number): void {
    // Call the service method to delete the center
    this.VaccinationCentersService.deleteVaccinationCenter(centerId).subscribe(
      () => {
        // Handle success, maybe update the list of centers
        console.log('Center deleted successfully');
        this.modificationMessage = '';
        this.addMessage='';
        this.noInputMessage = false; // Show the message
        this.deletionMessage = 'Centre supprimé avec succès.';
        this.getAllCenters();

      },
      (error) => {
        // Handle error
        console.error('Error deleting center:', error);
      }
    );
  }

  selectCenterForModification(center: VaccinationCenter): void {
    this.selectedCenter = center;
    this.noInputMessage = false; // Show the message

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
  
      // Call your service method to update the center on the backend
      this.VaccinationCentersService.updateVaccinationCenter(modifiedCenter).subscribe(
        () => {
          // Update the local list of centers or perform other actions if needed
          // Reset the selected center and the modification form
          this.selectedCenter = null;
          this.modificationForm.reset();
          console.log("e");
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
  this.noInputMessage = false; // Show the message

}
}
  
  
