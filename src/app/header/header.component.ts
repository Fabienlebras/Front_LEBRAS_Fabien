import { Component } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Define a property to store the reference to MatMenu
  myMenu: MatMenu | undefined;

  // Other properties and methods...
}