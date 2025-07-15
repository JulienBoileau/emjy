import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ServicesComponent } from './services/services.component';
import { AgendaComponent } from './agenda/agenda.component';
import { GalerieComponent } from './galerie/galerie.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent },
    { path: 'presentation', component: PresentationComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'agenda', component: AgendaComponent },
    { path: 'galerie', component: GalerieComponent },
    { path: 'contact', component: ContactComponent },
  ];


