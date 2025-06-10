import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{
  editproductform!:FormGroup
  editprofile!:any;
  themedata!:any;

  constructor(public curdservice:CrudService,public router:Router,public actroute: ActivatedRoute,public mainservice:CrudService, public toster: ToastrService){
  
  }
ngOnInit() {
  this.curdservice.trigerloader(true);
  this.editproductform = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Param: new FormControl('', [Validators.required]),
    Categories: new FormControl('', [Validators.required]),
    Brand: new FormControl('', [Validators.required]),
    Enable: new FormControl('', [Validators.required]),
 
  });

  this.actroute.paramMap.subscribe(params => {
    let routeurl:any = params.get("product");

    console.log(routeurl);
    this.mainservice.getproductonce(routeurl, (resolve: any) => {
      this.curdservice.trigerloader(false);
      console.log(resolve);
      this.editprofile = resolve.data;
      this.editproductform.setValue({
        Title: this.editprofile?.Title,
        Description: this.editprofile?.Description,
        Price: this.editprofile?.Price,
        Param: this.editprofile?.Param,
        Categories: this.editprofile?.Categories,
        Brand: this.editprofile?.Brand,
        Enable: this.editprofile?.Enable,
      });
      

    }, (err: any) => {
      console.log(err);

    })



  });

  this.curdservice.getthemeconfig((jsondata:any)=>{
    
    
    let themeconfigue=JSON.parse(jsondata?.data?.jsondata);
    this.themedata=themeconfigue.brand
console.log(this.themedata);
    
    
  },(err:any)=>{
    console.log(err);
    
  })

 

}
productsaver(){
  
  let newproductchanges=this.editproductform.value
  this.curdservice.createProductData(newproductchanges,(ress:any)=>{
    this.toster.success('updated successfully', "succes");
    
  },(err:any)=>{
    console.log(err);
  })
  
}
// hover overlayer
items = [
  { id: 1, name: 'Item 1', imageUrl: 'path/to/item1.jpg', hovered: false },
  { id: 2, name: 'Item 2', imageUrl: 'path/to/item2.jpg', hovered: false },
  // Add more items as needed
];
hovered = false;

onItemHover(): void {
  this.hovered = true;
}

onItemLeave(): void {
  this.hovered = false;
}
// hover overlayer
}


