import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/productlist/service.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productlist: any[] = [];

  constructor(

    public activerouter: ActivatedRoute,
    public productservice: CrudService
  ) {

  }

  ngOnInit() {

    this.productservice.trigerloader(true);
    this.activerouter.paramMap.subscribe((params) => {
      this.productservice.trigerloader(false);
      let categories = params.get('categories');
      let listtype = params.get('type');
      console.log(categories,listtype);
      

      this.productservice.getallproduct((products: any) => {
        let listproducts = products.data;
        console.log(products);
        this.productlist = [];
        if (listtype == "categories" && products.Response) {

          for (let list in listproducts) {
            let listvalue = listproducts[list];
            if (listvalue.Categories == categories && (listvalue.Enable == true || listvalue.Enable == 'true')) {
              this.productlist.push(listvalue);
            }
          }

          console.log(this.productlist);
          
        }
        if (listtype == "brand" && products.Response) {

          for (let list in listproducts) {
            let listvalue = listproducts[list];
            if (listvalue.Brand == categories && (listvalue.Enable == true || listvalue.Enable == 'true')) {
              this.productlist.push(listvalue);
            }
          }

          console.log(this.productlist);
          
        }
      

      }, (err: any) => {
        console.log(err);

      })
    });
  }

}
