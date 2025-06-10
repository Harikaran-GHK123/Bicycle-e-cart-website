import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrls: ['./dashboarduser.component.scss']
})
export class DashboarduserComponent implements OnInit {
[x: string]: any;

  dashborduser: any[] = [];
  filtereddashboardusers:any[]=[];
  isChecked: boolean = false;
  changedata: any;
  seachcategories!:any;



  constructor(public curddata: CrudService) {
    this.curddata.trigerloader(true);
    this.curddata.getallusers((responce: regeisterdatatype) => {
      console.log('sucess responce', responce);
      this.curddata.trigerloader(false);
      let dataresponce: any = responce?.data;
      this.dashborduser=[]
      this.filtereddashboardusers=[]
      for (let user in dataresponce) {
        let uservalue: any = dataresponce[user];
        this.dashborduser.push(uservalue);
        this.filtereddashboardusers.push(uservalue);
        
        
      }

      console.log(this.dashborduser);


    }, (error: any) => {
      console.log(error);

    })

  }
  ngOnInit() {
  }

  checkboxChanged(event: any,user:any) {
    const isChecked = event.target.checked;
    
    let changedata ={
      status: isChecked
    }
    
   

  this.curddata.changeuserdata(changedata, user.username);

  }



  onSearch() {
    this.filtereddashboardusers = this.dashborduser.filter(item =>
      item.username.toLowerCase().includes(this.seachcategories.toLowerCase())
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



}
export class regeisterdatatype {


  username?: string;
  email?: string;
  userType?: string;
  password?: string;
  status?: boolean;
  cart?: string[];
  data?: regeisterdatatype;


}







