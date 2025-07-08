import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Spectacle {
  date: string; // YYYY-MM-DD
  title: string;
  info: string;
  lieu: string;
  adresse: string;
  heure: string;
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
    { date: `${this.currentYear}-${this.pad(this.currentMonthIndex+1)}-10`, title: 'Comedy Night', info: 'Théâtre Bordeaux', lieu: 'Théâtre Bordeaux', adresse: '12 rue des Remparts, Bordeaux', heure: '20h' },
    { date: `${this.currentYear}-${this.pad(this.currentMonthIndex+1)}-15`, title: 'Stand-up Show', info: 'Salle Le Pin', lieu: 'Salle Le Pin', adresse: '45 avenue du Pin, Bordeaux', heure: '21h' },
    { date: `${this.currentYear}-${this.pad(this.currentMonthIndex+1)}-22`, title: 'One Man Show', info: 'Casino Bordeaux', lieu: 'Casino Bordeaux', adresse: '3 boulevard du Casino, Bordeaux', heure: '19h' }
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