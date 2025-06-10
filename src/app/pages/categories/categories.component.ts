import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  categorieslist: any []= [];
  filtercategorieslist: any []= [];
  seachcategories!:any;

  constructor(private userService: CrudService,public actroute: ActivatedRoute) {
   
 
  }

  ngOnInit() {
    this.userService.trigerloader(true);
   this.userService.getcategories(
      (response:any) => {
      
        console.log(response);
        this.userService.trigerloader(false);
        
        let users:any = response?.data;
        this.categorieslist=[]
        this.filtercategorieslist=[]
        for(let user in users){
          let uservalue:any = users[user]
          this.categorieslist.push(uservalue)
          this.filtercategorieslist.push(uservalue)
        }
      },
      (error:any) => {
        // Handle error here
        console.error(error.data);
      }
    );
  }

  onSearch() {
    this.filtercategorieslist = this.categorieslist.filter(item =>
      item.Param.toLowerCase().includes(this.seachcategories.toLowerCase())
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



  // editcategories(){
    
   
  // }


}
