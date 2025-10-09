import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIf } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('EMJY PRODUCTION');
    this.metaService.updateTag({ name: 'description', content: 'Captation vidéo, montage et production d\'évènements.' });
  }
  
  title = 'emjy';

  showModal: 'mentions' | 'confidentialite' | null = null;

  openModal(type: 'mentions' | 'confidentialite') {
    this.showModal = type;
  }

  closeModal() {
    this.showModal = null;
  }
}
