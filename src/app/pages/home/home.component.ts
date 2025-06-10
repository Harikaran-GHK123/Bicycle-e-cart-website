import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CrudService } from 'src/app/service/crud.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  themes!:any;
  jsondata!:any;

  constructor(public curdserv: CrudService, public rotue: Router) { }
  ngOnInit(): void {
    this.curdserv.trigerloader(true)
    this.curdserv.getcategories((categoris: any) => {
      this.curdserv.trigerloader(false)
      console.log(categoris);
      this.categories = []
      if (categoris.Response) {
        let categoriesdata = categoris?.data;
        for (let objectdata in categoriesdata) {
         
          let eachcategories = categoriesdata[objectdata];
          if (eachcategories.Enable == true || eachcategories.Enable == "true") {
            this.categories.push(eachcategories)
           }

        }
        console.log(this.categories);
        
      }


    }, (err: any) => { })

   this.curdserv.getthemeconfig((ress:any)=>{
    console.log(ress);
    
    if(ress.Response){
      this.jsondata = JSON.parse(ress?.data?.jsondata);
    }
  
   },(err:any)=>{
    console.log(err);
    
   })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }



}
