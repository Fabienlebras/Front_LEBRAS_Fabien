import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/Doctor.models';


@Injectable({
  providedIn: 'root',
})
export class DoctorService {
    private apiUrl = 'http://localhost:8080/doctor/';
    
      
    constructor(private http: HttpClient) {}
  
    getDoctor(): Observable<Doctor[]> {
      return this.http.get<Doctor[]>(this.apiUrl+"All-doctor");
    }

    addDoctor(firstName: string, lastName: string, mail: string,phone:string,id:string): Observable<any> {
     
      let data;
      let requestbody={};
      data = firstName+'&&'+lastName+'&&'+mail+'&&'+phone+'&&'+id;
  
      return this.http.post(this.apiUrl + 'adddoctor/'+data,requestbody);
  }



  deleteDoctor(centerId:number): Observable<any>{
    let requestbody={};

    return this.http.post(this.apiUrl+"deletedoctor/"+centerId,requestbody);
}




updateDoctor(Doctor:Doctor):Observable<any>{

    const data = `${Doctor.firstName}&&${Doctor.lastName}&&${Doctor.mail}&&${Doctor.phone}&&${Doctor.id}&&${Doctor.vaccinationCenter}`;
    return this.http.post(this.apiUrl + 'updatedoctor/' + data, {});


}
}