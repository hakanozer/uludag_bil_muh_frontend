import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe',
})
export class TitlePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    // gelen value içinde en fazla 3 kelime varsa sadece ilk 3 kelimeyi döndür, yoksa gelen value'yu döndür
    const trim = value.trim();
    const words = trim.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return trim;
  }


}
