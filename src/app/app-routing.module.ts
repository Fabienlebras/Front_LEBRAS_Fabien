import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCentersComponent } from './vaccination-centers/vaccination-centers.component'; 
import {AdministratorComponent } from './administrator/administrator.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {VaccinationlistComponent} from './vaccinationlist/vaccinationlist.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: 'centers', component: VaccinationCentersComponent },  
  {path: 'administrators', component: AdministratorComponent},
  {path:'patients',component:PatientListComponent},
  {path:'vaccinations',component:VaccinationlistComponent},
  {path:'doctors',component:DoctorListComponent},
  {path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
