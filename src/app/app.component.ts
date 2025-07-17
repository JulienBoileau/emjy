import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'emjy';

  showModal: 'mentions' | 'confidentialite' | null = null;

  openModal(type: 'mentions' | 'confidentialite') {
    this.showModal = type;
  }

  closeModal() {
    this.showModal = null;
  }
}
