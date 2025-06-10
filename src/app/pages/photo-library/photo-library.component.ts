import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/service/crud.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-photo-library',
  templateUrl: './photo-library.component.html',
  styleUrls: ['./photo-library.component.scss']
})
export class PhotoLibraryComponent  {
   photolib:string[]=[]

  constructor(public fileupload:FileUploadService,public curdservice:CrudService ,public toster:ToastrService){
    this.curdservice.trigerloader(true)

   this.fileupload.getallfiles((file:string[])=>{
  this.curdservice.trigerloader(false)
    console.log(file);
    this.photolib=file;
    // if(){
    //   this.toster.success('Photo uploaded successfull','Success')
    // }
     
   })

  }
 
  

  

}
