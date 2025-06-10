import { Component } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
user: any;
changedata: any;
newpassword: any;

  constructor(public curddata:CrudService){}
  chagepassword(event: any, user: any) {
    const newpassword = event.target.value;
 
  
    let changedata = {
      password: newpassword
    };
  
    this.curddata.changeuserdata(changedata, 'harikaran');
  }

}
