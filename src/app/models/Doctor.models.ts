import { VaccinationCenter } from "./vaccination-center.model";

export class Doctor {
    id: number;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    vaccinationCenter: VaccinationCenter
    constructor(id: number, firstName: string, lastName: string, mail: string,phone:string,vaccinationCenter:VaccinationCenter) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.phone = phone;
      this.vaccinationCenter = vaccinationCenter;
    }
  }

