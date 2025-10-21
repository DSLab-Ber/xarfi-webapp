import { useState } from 'react';
import { startOfWeek, addWeeks, addDays, format } from 'date-fns';

export class WeekNavigator {
  private currentWeekStart: Date;

  constructor(referenceDate: Date = new Date()) {
    this.currentWeekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });
  }

  private generateWeek(weekStart: Date) {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      return {
        dayName: format(date, 'EEEE'), // Full day name
        dayNumber: format(date, 'd'),  // Day of month without leading zero
        month: format(date, 'MMMM'),   // Month name
        year: format(date, 'yyyy'),    // Year
      };
    });
  }

  getCurrentWeek() {
    return this.generateWeek(this.currentWeekStart);
  }

  getNextWeek() {
    this.currentWeekStart = addWeeks(this.currentWeekStart, 1);
    return this.getCurrentWeek();
  }

  getPreviousWeek() {
    this.currentWeekStart = addWeeks(this.currentWeekStart, -1);
    return this.getCurrentWeek();
  }

  jumpWeeks(weeks: number) {
    this.currentWeekStart = addWeeks(this.currentWeekStart, weeks);
    return this.getCurrentWeek();
  }

  getCurrentMonthYear() {
    return {
      month: format(this.currentWeekStart, 'MMMM'),
      year: format(this.currentWeekStart, 'yyyy'),
    };
  }

  goToWeek(date: Date) {
    this.currentWeekStart = startOfWeek(date, { weekStartsOn: 1 });
    return this.getCurrentWeek();
  }
}

export function useWeekNavigator(initialDate?: Date) {
  const [navigator] = useState(() => new WeekNavigator(initialDate));
  const [week, setWeek] = useState(navigator.getCurrentWeek());
  const [monthYear, setMonthYear] = useState(navigator.getCurrentMonthYear());

  const updateWeek = (newWeek: typeof week) => {
    setWeek(newWeek);
    setMonthYear(navigator.getCurrentMonthYear());
  };

  const goNextWeek = () => updateWeek(navigator.getNextWeek());
  const goPreviousWeek = () => updateWeek(navigator.getPreviousWeek());
  const jumpWeeks = (weeks: number) => updateWeek(navigator.jumpWeeks(weeks));
const goToWeek = (date: Date) => updateWeek(navigator.goToWeek(date));


  return {
    week,
    monthYear,
    goNextWeek,
    goPreviousWeek,
    jumpWeeks,
    goToWeek
  };
}