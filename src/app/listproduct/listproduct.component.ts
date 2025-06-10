import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss']
})
export class ListproductComponent {

  categorieslist: any []= [];
  filtercategorieslist: any []= [];
  seachcategories!:any
  caturl:any='';

  constructor(private userService: CrudService,public actroute: ActivatedRoute) {
   
 
  }

  ngOnInit() {
    this.userService.trigerloader(true);
    this.actroute.paramMap.subscribe(params => {
      this.caturl= params.get("categories");
      
      this.userService.getallproduct((res:any)=>{
        this.userService.trigerloader(false);
        this.categorieslist=[];
        this.filtercategorieslist=[];
       
        let data = res.data
        for (let key in data) {
        
          if(data[key].Categories == this.caturl){
            this.categorieslist.push(data[key]);
            this.filtercategorieslist.push(data[key])
            
          }
        }
        console.log(this.categorieslist);
        
      },(err:any)=>{
        console.log(err);
        
      })
      
    });

   
  }

  
  onSearch() {
    this.filtercategorieslist = this.categorieslist.filter(item =>
      item.username.toLowerCase().includes(this.seachcategories.toLowerCase())
    );
  }
  transform(value: string, args: string): any {
    if (args && value) {
        let startIndex = value.toLowerCase().indexOf(args.toLowerCase());
        if (startIndex != -1) {
            let endLength = args.length;
            let matchingString = value.substr(startIndex, endLength);
            return value.replace(matchingString, "<mark>" + matchingString + "</mark>");
        }

    }
    return value;
}

}
