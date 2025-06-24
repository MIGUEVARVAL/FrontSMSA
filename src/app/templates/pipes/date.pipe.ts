import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {
  private meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  transform(value: string | Date): string {
    if (!value) return '';
    const fecha = new Date(value);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = this.meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${dia} de ${mes} de ${año} a las ${horas}:${minutos}`;
  }
}