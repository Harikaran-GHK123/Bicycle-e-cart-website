import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/localstorageservice/local-service.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  dashuserdata!:any
  cartdata:any[]=[];
  constructor(public curdservice:CrudService,public router:Router,public local:LocalServiceService,public toaster:ToastrService){}
  ngOnInit(){
    let localdata = this.local.getItem('authkey');


    if (localdata != null && localdata.userType == 'general') {
      this.curdservice.getuser(localdata, (ress: any) => {
        console.log(ress);

        if (ress.Response && ress.data.status) {
          this.dashuserdata = ress.data;
          if(typeof ress.data.cart!="undefined"){
            let cart = ress.data.cart || [];
            this.curdservice.getallproduct((ress:any)=>{
              this.cartdata = [];
              if(ress.Response){
                let productdata=ress.data;
                for(let product of cart){
                  for(let list in productdata){
                    let eachproduct=productdata[list];
                    if(eachproduct.Param==product){
                      this.cartdata.push(eachproduct);
                    }
                  }
                }
                console.log(this.cartdata);
                
              }
            },()=>{});
          }
        }else{
        this.curdservice.triggereddisablepopup(true);
        }
      }, () => { });
    }
  }


  placeorder(){
    let localdata= this.local.getItem('authkey')
    if(localdata!=null && localdata.userType=='general'){
      let cartdata={
        username:localdata.username,
        cart:[]
      }
      this.curdservice.userupdates(cartdata,()=>{
        this.toaster.success('Order placed successfully','Success');
        setTimeout(()=>{
          window.location.reload();
        },2000)
        
      },()=>{});
    }else{
     this.toaster.error('you dont have any proper account')
    }
  }

}

