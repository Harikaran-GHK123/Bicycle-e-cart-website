import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createnew',
  templateUrl: './createnew.component.html',
  styleUrls: ['./createnew.component.scss']
})
export class CreatenewComponent implements OnInit {
 createform!:FormGroup;
  toastr: any;
  router: any;
  constructor(public createnew:CrudService,public toster:ToastrService,public routers:Router){
    this.createnew.getcategories((ress:any)=>{
      console.log(ress);
     
      
    },(err:any)=>{
      console.log(err);
      
    });
  }
  
  

  ngOnInit(){
    this.createform=new FormGroup({
      
      Tittle: new FormControl('',[Validators.required]),
      Param: new FormControl('', [Validators.required]),
      Enable: new FormControl('',[Validators.required]),
    
    });
    this.createnew.trigerloader(false); 
  }
  
  createforms(){
    
    let createdata=this.createform.value
    this.createnew.getcategoriesonce(createdata,(resolve:any)=>{
      this.createnew.trigerloader(true); 
      if (!resolve.Response) {

        this.createnew.createcategories(createdata,()=>{
          this.routers.navigate(['/dash_board/categories'])
        this.toster.success('Categories created successfully', 'success');
        },()=>{
          this.toster.error('Something went wrong', 'error');
        })
        
      }
      else {
     
        this.toster.info('allready exist', 'error');
      }
    },(err:any)=>{
      this.toster.error('categeries not found', 'err');
    });

  }


}
