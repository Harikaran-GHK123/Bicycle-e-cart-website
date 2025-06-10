import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})
export class CreateproductComponent {

  createproductform!:FormGroup
  urlm!:any;
  themedata!:any;

  constructor(public productservise:CrudService,public route:ActivatedRoute,public roter:Router,public toster:ToastrService){}
ngOnInit() {
  this.productservise.trigerloader(true);
  this.createproductform = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Price: new FormControl('', [Validators.required]),
    Param: new FormControl('', [Validators.required]),
    Categories: new FormControl('', [Validators.required]),
    Brand: new FormControl('', [Validators.required]),
    Enable: new FormControl('', [Validators.required]),
 
  });

 
  this.route.paramMap.subscribe(params => {
    this.urlm = params.get("categories");
    
   this.createproductform.get('Categories')?.setValue(this.urlm);
   
    
  });

  this.productservise.getthemeconfig((jsondata:any)=>{
    
    this.productservise.trigerloader(false);
    let themeconfigue=JSON.parse(jsondata?.data?.jsondata);
    this.themedata=themeconfigue.brand
console.log(this.themedata);
    
    
  },(err:any)=>{
    console.log(err);
    
  })

}
createproduct(){
  
  let productdata=this.createproductform.value
  
  
  this.productservise.createProductData(productdata,(ress:any)=>{
    console.log('product data added successfull',ress);
    this.createproductform.reset()
    this.toster.success('product is successfully added','success');
    this.roter.navigate(['/dash_board/listproduct/'+this.urlm])
    
    
  },(rej:any)=>{
    console.log(rej);
    
  })
  
}


}
