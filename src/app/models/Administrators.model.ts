import { VaccinationCenter } from "./vaccination-center.model";

export class Administrators {
    id: number;
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
    vaccination_center_id: string;
    constructor(id: number, firstName: string,lastName: string, mail: string, phone: string,vaccination_center_id:string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.phone = phone;
      this.vaccination_center_id=vaccination_center_id;
    }
  }