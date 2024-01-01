// Exemple de service Angular utilisant HttpClient
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VaccinationCenter } from '../models/vaccination-center.model'; 
import { HttpHeaders, HttpStatusCode } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class VaccinationCentersService {
    private apiUrl = 'http://localhost:8080/vaccination-center/';
    
      
    constructor(private http: HttpClient) {}
  
    getVaccinationCenters(): Observable<VaccinationCenter[]> {
      return this.http.get<VaccinationCenter[]>(this.apiUrl+"All-center");
    }
    getVaccinationCentersByCity(city: string): Observable<VaccinationCenter[]> {
        return this.http.get<VaccinationCenter[]>(this.apiUrl + 'bycity/' + city);
      }

      addVaccinationCenter(name: string, address: string, city: string): Observable<any> {
     
        let data;
        let requestbody={};
        data = name+'&&'+address+'&&'+city;
        console.log(data);
        console.log(this.apiUrl+'addcenter/'+data);
        return this.http.post(this.apiUrl + 'addcenter/'+data,requestbody);
    }

    deleteVaccinationCenter(centerId:number): Observable<any>{
        let requestbody={};

        return this.http.post(this.apiUrl+"deletecenter/"+centerId,requestbody);
    }

    updateVaccinationCenter(modifiedCenter: VaccinationCenter): Observable<any> {
        const data = `${modifiedCenter.name}&&${modifiedCenter.address}&&${modifiedCenter.city}&&${modifiedCenter.id}`;
        
        return this.http.post(this.apiUrl + 'updatecenter/' + data, {});
      }
}