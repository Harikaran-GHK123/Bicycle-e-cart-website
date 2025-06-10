import { Component, OnInit } from '@angular/core';
import { LocalServiceService } from 'src/app/localstorageservice/local-service.service';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  dashuserdata!: any;
  constructor(public localstorageservice: LocalServiceService, public router: Router, public crudservice: CrudService) { }
  ngOnInit() {
    let localdata = this.localstorageservice.getItem('authkey');

    console.log(localdata);
    if (localdata != null && localdata.userType == 'admin') {
      this.crudservice.getuser(localdata, (ress: any) => {
        console.log(ress);

        if (ress.Response && ress.data.status) {
          this.dashuserdata = ress.data;
        }else{
        this.crudservice.triggereddisablepopup(true)
        }
      }, () => { })
    }


  }



  logout() {
    this.localstorageservice.removeItem('authkey')
    this.router.navigate(['/home'])
  }

}
