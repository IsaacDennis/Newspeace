import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const date = value.split('T')[0];
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth() + 1; //Janeiro é 0
    const currentDay = currentDate.getUTCDate();
    const [, strMonth, strDay] = date.split('-');
    const publishedMonth = Number.parseInt(strMonth, 10);
    const publishedDay = Number.parseInt(strDay, 10);
    if (currentMonth - publishedMonth === 0) {
      return currentDay - publishedDay === 0 ? 'Hoje' : `${currentDay - publishedDay} dias atrás`;
    }
    return currentMonth - publishedMonth === 1 ? '1 mês atrás' : `${currentMonth - publishedMonth} meses atrás`;
  }

}
