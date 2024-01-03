import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrators } from '../models/Administrators.model'; 



@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
    private apiUrl = 'http://localhost:8080/administrator/';
    
      
    constructor(private http: HttpClient) {}
  
    getAdministrators(): Observable<Administrators[]> {
      return this.http.get<Administrators[]>(this.apiUrl+"All-administrator");
    }

    addAdmnistrator(firstName: string, lastName: string, mail: string,phone:string,id:string): Observable<any> {
     
      let data;
      let requestbody={};
      data = firstName+'&&'+lastName+'&&'+mail+'&&'+phone+'&&'+id;
  
      return this.http.post(this.apiUrl + 'addadministrator/'+data,requestbody);
  }


  deleteAdministrator(centerId:number): Observable<any>{
    let requestbody={};

    return this.http.post(this.apiUrl+"deleteadmin/"+centerId,requestbody);
}



updateVaccinationCenter(Admin:Administrators):Observable<any>{

    const data = `${Admin.firstName}&&${Admin.lastName}&&${Admin.mail}&&${Admin.phone}&&${Admin.id}&&${Admin.vaccination_center_id}`;
    
    return this.http.post(this.apiUrl + 'updateadmin/' + data, {});


}
}