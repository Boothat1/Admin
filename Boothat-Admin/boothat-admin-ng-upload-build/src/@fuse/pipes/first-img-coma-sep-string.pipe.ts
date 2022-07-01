import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstImgComaSepString'
})
export class FirstImgComaSepStringPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    if (value === '') {
      return '';
    }
    if(value){
      const MyImage =   value.split(',')[0]
      if(MyImage) {
        // console.log("hello there in piepe",MyImage);
        
        return MyImage;
      } 

      // console.log("first image  ",myArr[0]);
      }
    }
}
