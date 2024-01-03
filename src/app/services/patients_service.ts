import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model'; 



@Injectable({
  providedIn: 'root',
})
export class patientService {
    private apiUrl = 'http://localhost:8080/patient/';
    
      
    constructor(private http: HttpClient) {}
  
    getPatient(): Observable<Patient[]> {
      return this.http.get<Patient[]>(this.apiUrl+"All-patient");
    }

    addPatient(firstName: string, lastName: string, mail: string,phone:string): Observable<any> {
     
      let data;
      let requestbody={};
      data = firstName+'&&'+lastName+'&&'+mail+'&&'+phone+'&&';
  
      return this.http.post(this.apiUrl + 'addpatient/'+data,requestbody);
  }


  deletePatient(centerId:number): Observable<any>{
    let requestbody={};

    return this.http.post(this.apiUrl+"deletepatient/"+centerId,requestbody);
}



updatePatient(patient:Patient):Observable<any>{

    const data = `${patient.firstName}&&${patient.lastName}&&${patient.mail}&&${patient.phone}&&${patient.id}`;
    
    return this.http.post(this.apiUrl + 'updatepatient/' + data, {});


}
}