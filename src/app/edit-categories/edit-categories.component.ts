
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  editcategories: any
  catforms!: FormGroup

  constructor(public actroute: ActivatedRoute, public mainservice: CrudService, public router: Router, public toster: ToastrService) {
    this.catforms = new FormGroup({
      Tittle: new FormControl('', [Validators.required]),
      Param: new FormControl('', [Validators.required]),
      Enable: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit() {

    this.actroute.paramMap.subscribe(params => {
      this.mainservice.trigerloader(true);
      let routeurl = params.get("categories");

      console.log(routeurl);
      this.mainservice.getcategorieonceforurl(routeurl, (resolve: any) => {
        console.log(resolve);
        this.mainservice.trigerloader(false);
        this.editcategories = resolve.data;
        this.catforms.setValue({
          Tittle: this.editcategories?.Tittle,
          Param: this.editcategories?.Param,
          Enable: this.editcategories?.Enable,
        });


      }, (err: any) => {
        console.log(err);

      })



    });
  }
  oncatchanges() {
    let newdata = this.catforms.value
    console.log(newdata);

    this.mainservice.createcategories(newdata, (suss: any) => {
      this.toster.success('updated successfully', "succes");
    }, (err: any) => {
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
