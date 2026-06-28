import { useEffect, useMemo, useState } from 'react';
import type { AgendaEvent } from '../lib/models';
import { subscribeAgendaEvents } from '../lib/siteContent';
import './AgendaPage.css';

const monthNames = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

export function AgendaPage() {
  const now = new Date();
  const currentYearRef = now.getFullYear();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(currentYearRef);
  const [spectacles, setSpectacles] = useState<AgendaEvent[]>([]);
  const [selected, setSelected] = useState<AgendaEvent | null>(null);
  const [monthDirection, setMonthDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => subscribeAgendaEvents(setSpectacles), []);

  const daysInMonth = useMemo(() => {
    const days = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [currentMonthIndex, currentYear]);

  function pad(value: number) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  function getForDay(day: number) {
    const key = `${currentYear}-${pad(currentMonthIndex + 1)}-${pad(day)}`;
    return spectacles.filter((item) => item.date === key);
  }

  function getForMonth() {
    const key = `${currentYear}-${pad(currentMonthIndex + 1)}`;
    return spectacles.filter((item) => item.date.startsWith(key));
  }

  const filterYears = [currentYearRef, currentYearRef + 1];

  const selectableMonths = useMemo(() => {
    const options: Array<{ value: string; label: string }> = [];
    filterYears.forEach((year) => {
      monthNames.forEach((month, index) => {
        options.push({ value: `${year}-${index}`, label: `${month} ${year}` });
      });
    });
    return options;
  }, [filterYears]);

  function nextMonth() {
    if (currentYear === currentYearRef + 1 && currentMonthIndex >= 11) return;
    setMonthDirection('next');
    const next = currentMonthIndex + 1;
    if (next > 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((v) => v + 1);
    } else {
      setCurrentMonthIndex(next);
    }
  }

  function prevMonth() {
    if (currentYear === currentYearRef && currentMonthIndex <= 0) return;
    setMonthDirection('prev');
    const prev = currentMonthIndex - 1;
    if (prev < 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((v) => v - 1);
    } else {
      setCurrentMonthIndex(prev);
    }
  }

  function onMonthFilterChange(value: string) {
    const [yearStr, monthStr] = value.split('-');
    const nextYear = Number(yearStr);
    const nextMonth = Number(monthStr);
    if (Number.isNaN(nextYear) || Number.isNaN(nextMonth)) return;

    const currentCursor = (currentYear * 12) + currentMonthIndex;
    const nextCursor = (nextYear * 12) + nextMonth;
    setMonthDirection(nextCursor >= currentCursor ? 'next' : 'prev');
    setCurrentYear(nextYear);
    setCurrentMonthIndex(nextMonth);
  }

  return (
    <section className="agenda">
      <div className="agenda-header">
        <button type="button" onClick={prevMonth} aria-label="Mois precedent"><i className="fa-solid fa-chevron-left" /></button>
        <h2>{monthNames[currentMonthIndex]} {currentYear}</h2>
        <button type="button" onClick={nextMonth} aria-label="Mois suivant"><i className="fa-solid fa-chevron-right" /></button>
      </div>

      <div className="month-filter-wrap">
        <label htmlFor="month-filter">Choisir un mois</label>
        <select
          id="month-filter"
          className="month-filter"
          value={`${currentYear}-${currentMonthIndex}`}
          onChange={(event) => onMonthFilterChange(event.target.value)}
        >
          {selectableMonths.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="view-toggle">
        <button className={viewMode === 'calendar' ? 'active' : ''} type="button" onClick={() => setViewMode('calendar')}><i className="fa-solid fa-calendar-days" /> Calendrier</button>
        <button className={viewMode === 'list' ? 'active' : ''} type="button" onClick={() => setViewMode('list')}><i className="fa-solid fa-list" /> Liste</button>
      </div>

      <div
        key={`${currentYear}-${currentMonthIndex}-${viewMode}`}
        className={`agenda-content month-transition-${monthDirection}`}
      >
        {viewMode === 'calendar' ? (
          <div className="calendar">
            {daysInMonth.map((day) => (
              <div key={day} className="day-cell">
                <div className="day-number">{day}</div>
                {getForDay(day).map((item) => (
                  <div className="spectacles" key={item.id} onClick={() => setSelected(item)}>
                    <strong>{item.title}</strong>
                    <p>{item.info}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="list-view">
            {getForMonth().map((item) => (
              <article className="list-item" key={item.id} onClick={() => setSelected(item)}>
                <div className="left">
                  <div className="date"><i className="fa-solid fa-calendar-day" /> {item.date}</div>
                  <div className="heure"><i className="fa-solid fa-clock" /> {item.heure}</div>
                </div>
                <div className="right">
                  <strong>{item.title}</strong>
                  <p><i className="fa-solid fa-location-dot" /> {item.lieu}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="close-btn" type="button" onClick={() => setSelected(null)}><i className="fa-solid fa-xmark" /></button>
            <h3>{selected.title}</h3>
            <p><i className="fa-solid fa-calendar-day" /> {selected.date}</p>
            <p><i className="fa-solid fa-clock" /> {selected.heure}</p>
            <p><i className="fa-solid fa-location-dot" /> {selected.lieu}</p>
            <p><i className="fa-solid fa-map" /> {selected.adresse}</p>
            <a href={selected.billetterie} className="btn-buy" target="_blank" rel="noreferrer">Acheter billet(s)</a>
          </div>
        </div>
      )}
    </section>
  );
}
