import { Pipe, PipeTransform } from '@angular/core';
// file-url.pipe.ts


@Pipe({
  name: 'fileUrl'
})
export class FileUrlPipe implements PipeTransform {
  transform(file: File): string {
    return file ? URL.createObjectURL(file) : '';
  }
}
