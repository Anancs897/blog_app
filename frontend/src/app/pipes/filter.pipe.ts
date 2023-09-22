import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts:any[], filterString:any, propName:any):any[]{

    const result:any=[];

    if(posts==null || filterString==null || filterString=='')
    return posts;

    posts.forEach((post:any)=>{
      if(post[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(post);
      }
    })

    return result;

    
  }

}
