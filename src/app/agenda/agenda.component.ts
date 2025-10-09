import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Spectacle {
  date: string; // YYYY-MM-DD
  title: string;
  info: string;
  lieu: string;
  adresse: string;
  heure: string;
  billetterie: string;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  viewMode: 'calendar' | 'list' = 'calendar';

  currentMonthIndex = new Date().getMonth();
  currentYear = new Date().getFullYear();
  daysInMonth: number[] = [];
  monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  selectedSpectacle: Spectacle | null = null;

  spectacles: Spectacle[] = [
    { date: `${this.currentYear}-${this.pad(this.currentMonthIndex+1)}-19`, title: 'Comedy Club', info: 'L\'Empire Bordeaux', lieu: 'L\'Empire Bordeaux', adresse: '14 Rue de la Devise, Bordeaux', heure: '19h15 & 21h15', billetterie: 'https://billetterie.festik.net/l-empire-comedy-club/product/empire-comedy-club-n17/?draftkey=ae6e08de06281d7e0b6d7fe3f5eb0069' },
    { date: '2025-10-23', title: 'Comedy Club', info: 'Rimshot Clermont-Ferrand', lieu: 'Rimshot Clermont-Ferrand', adresse: '10 rue des Frères Lumière, Clermont-Ferrand', heure: '19h00 & 21h00', billetterie: '#' },
    { date: '2025-09-24', title: 'Comedy Club', info: 'L\'Empire Bordeaux', lieu: 'L\'Empire Bordeaux', adresse: '14 Rue de la Devise, Bordeaux', heure: '19h00 & 21h00', billetterie: 'https://billetterie.festik.net/l-empire-comedy-club/product/empire-comedy-club-n18/?draftkey=8ee95dd9dd6967ff65fa9ff5bb3bd7a6' },
    { date: '2025-09-25', title: 'Comedy Club', info: 'Le Cardinal Brive', lieu: 'Le Cardinal Brive', adresse: '35 Avenue Maillard, Brive', heure: '19h30 & 21h00', billetterie: 'https://billetterie.festik.net/emjycomedyshow/product/emjy-comedy-club-brive/?draftkey=bb1d1c9882a68874e4890622f3d3c404' },
    { date: '2025-10-03', title: 'Comedy Club', info: 'Château des Dauphins St-Loubès', lieu: 'Château des Dauphins St-Loubès', adresse: '35 Route de Libourne, Saint-Loubès', heure: '20h00', billetterie: 'https://billetterie.festik.net/emjycomedyshow/product/emjy-comedy-club-st-loubes/?draftkey=a2b606a23c04600f5c8d07bf5ee13151' },
    { date: '2025-10-22', title: 'Comedy Club', info: 'L\'Empire Bordeaux', lieu: 'L\'Empire Bordeaux', adresse: '14 Rue de la Devise, Bordeaux', heure: '?', billetterie: '#' },
    { date: '2025-11-26', title: 'Comedy Club', info: 'L\'Empire Bordeaux', lieu: 'L\'Empire Bordeaux', adresse: '14 Rue de la Devise, Bordeaux', heure: '?', billetterie: '#' },

  ];

  ngOnInit() {
    this.updateDaysInMonth();
  }

  updateDaysInMonth() {
    const days = new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : '' + value;
  }

  getSpectaclesForDay(day: number) {
    const dayStr = `${this.currentYear}-${this.pad(this.currentMonthIndex+1)}-${this.pad(day)}`;
    return this.spectacles.filter(s => s.date === dayStr);
  }

  getSpectaclesForMonth() {
    const monthStr = `${this.currentYear}-${this.pad(this.currentMonthIndex+1)}`;
    return this.spectacles.filter(s => s.date.startsWith(monthStr));
  }

  nextMonth() {
    if ((this.currentMonthIndex - new Date().getMonth()) + (12 * (this.currentYear - new Date().getFullYear())) < 6) {
      this.currentMonthIndex++;
      if (this.currentMonthIndex > 11) {
        this.currentMonthIndex = 0;
        this.currentYear++;
      }
      this.updateDaysInMonth();
    }
  }

  prevMonth() {
    if (this.currentYear > new Date().getFullYear() || (this.currentYear === new Date().getFullYear() && this.currentMonthIndex > new Date().getMonth())) {
      this.currentMonthIndex--;
      if (this.currentMonthIndex < 0) {
        this.currentMonthIndex = 11;
        this.currentYear--;
      }
      this.updateDaysInMonth();
    }
  }

  openModal(s: Spectacle) {
    this.selectedSpectacle = s;
  }

  closeModal() {
    this.selectedSpectacle = null;
  }
}