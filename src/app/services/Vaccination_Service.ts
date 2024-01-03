import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccination } from '../models/vaccination.models'; 
import { Doctor } from '../models/Doctor.models';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class VaccinationService {
    private apiUrl = 'http://localhost:8080/vaccination/';
    
      
    constructor(private http: HttpClient) {}
  
    getVaccination(): Observable<Vaccination[]> {
      return this.http.get<Vaccination[]>(this.apiUrl+"All-vaccin");
    }

    addVaccin(id: string, patient: Patient, vaccinationDate: string,doctor:Doctor,validate:boolean): Observable<any> {
     
      let data;
      let requestbody={};
      data = id+'&&'+patient+'&&'+"120202"+'&&'+doctor+'&&'+validate;
      return this.http.post(this.apiUrl + 'addvaccin/'+data,requestbody);
  }


  deleteVaccin(vaccinId:number): Observable<any>{
    let requestbody={};
    return this.http.post(this.apiUrl+"deletevaccin/"+vaccinId,requestbody);
    

}

Validate(vaccin:Vaccination):Observable<any>{
    const data=vaccin.id;
    return this.http.post(this.apiUrl+"update/"+data,{});
}
}