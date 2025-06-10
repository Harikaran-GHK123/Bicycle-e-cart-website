import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { LocalServiceService } from 'src/app/localstorageservice/local-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit{

  product: any; 
  productparam!:any;
  constructor(
    private route: ActivatedRoute,
    private productService: CrudService,
    public locals:LocalServiceService,
    public toaster:ToastrService 
  ) {}

  
    ngOnInit(): void {
      this.productService.trigerloader(true);
    this.route.paramMap.subscribe((params)=>{
      this.productparam = params.get('product');
      this.productService.trigerloader(false);
      this.productService.getproductonce(this.productparam,(ress:any)=>{
        console.log(ress);
        this.product=ress.data
        
      },(err:any)=>{})
    })
    }

    addtocart(){
     let localdata= this.locals.getItem('authkey')
     if(localdata!=null && localdata.userType=='general'){
      this.productService.getuseronce(localdata,(ress:any)=>{
        let cart:any[]=[];
        let userdata=ress.data;
        console.log(ress);
        if(ress.Response ){

          if(typeof userdata.cart!='undefined'){
            cart=userdata.cart || [];
            cart.push(this.productparam);
          }else{

            cart.push(this.productparam);
          }
          let cartdata={
            username:localdata.username,
            cart:cart
          }
          this.productService.userupdates(cartdata,()=>{
            this.toaster.success('product add to the cart is successfully','Success')
          },()=>{});
        }
        
      },(err:any)=>{})
     }else{
      this.toaster.error('you dont have any proper account')
     }
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
