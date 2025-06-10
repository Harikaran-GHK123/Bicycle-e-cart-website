import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { ToastrService } from 'ngx-toastr';
declare var JsonEditor: any


@Component({
  selector: 'app-themeconfic',
  templateUrl: './themeconfic.component.html',
  styleUrls: ['./themeconfic.component.scss']
})
export class ThemeconficComponent implements OnInit {

  themeconfig!: any;
  




  constructor(public curdservice:CrudService ,public toster:ToastrService) { 
    
  
  }

  ngOnInit() {
  this.curdservice.trigerloader(true);
  this.curdservice.getthemeconfig((jsondata:any)=>{
    console.log("data added",jsondata);
    
    this.curdservice.trigerloader(false); 
    this.themeconfig = new JsonEditor('#json-display', getJson());

    function getJson() {
      
      
      try {
        return JSON.parse(jsondata?.data?.jsondata);
        
      
        
        
      } catch (ex) {
        alert('Wrong JSON Format: ' + ex);
      }
    }
    
  },(jsonerr:any)=>{
    console.log(jsonerr);
    
  })
  }

  getjson() {
    let jsondata = this.themeconfig?.get();
    let strigjson
    

    try {
      
      strigjson = JSON.stringify(jsondata);
      
      this.curdservice.setthemeconfig(strigjson);
      this.toster.success('successfully added','success')

     
      


    } catch (e) {
      console.log(e);

    }
    console.log(strigjson);

  }


}


