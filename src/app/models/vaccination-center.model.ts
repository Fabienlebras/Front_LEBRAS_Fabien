export class VaccinationCenter {
    id: number;
    name: string;
    address: string;
    city: string;
  
    constructor(id: number, name: string, address: string, city: string) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.city = city;
    }
  }