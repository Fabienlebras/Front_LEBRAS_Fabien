import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccinationCentersComponent } from './vaccination-centers/vaccination-centers.component';  // Replace with the actual path to your component

const routes: Routes = [
  { path: 'centers', component: VaccinationCentersComponent }  // Replace with the actual component name
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
