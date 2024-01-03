import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 

  isRegistering = false;
  user = { email: '', password: '' };
  registrationUser = { email: '', password: '' };

  toggleRegistrationForm() {
    this.isRegistering = !this.isRegistering;
  }

  onSubmit() {
  }

  onRegister() {
  }

  
}
