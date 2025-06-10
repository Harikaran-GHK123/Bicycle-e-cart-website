import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/localstorageservice/local-service.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userprofile!: FormGroup;
  localdata!: any;
  profilephoto!:any;
  constructor(public fb: CrudService, public localstorageservice: LocalServiceService, public toastr: ToastrService, public router: Router) {
    // document.getElementById("")!.modal('show');


  }
  ngOnInit(){
    this.userprofile = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      number: new FormControl('91', [ Validators.minLength(10)]),
      city: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
    });

    this.localdata = this.localstorageservice.getItem('authkey');

    if (this.localdata != null && this.localdata.userType != 'general') {
      this.fb.trigerloader(true);
      this.fb.getuseronce(this.localdata, (res: any) => {
        this.fb.trigerloader(false);
     

        if(res.data.userType!="general"){
         

          
          this.userprofile.setValue({
            username:res.data.username,
            email:res.data.email,
            number: "",
            city: "",
            gender: "",
            photo:""
          });

          if(typeof res?.data?.number!='undefined'){
            this.userprofile.patchValue(
              {
                number: res?.data?.number
              }
            )
          }
          if(typeof res?.data?.city!='undefined'){
            this.userprofile.patchValue(
              {
                city: res?.data?.city
              }
            )
          }
          if(typeof res?.data?.gender!='undefined'){
            this.userprofile.patchValue(
              {
                gender: res?.data?.gender
              }
            )
          }
          if(typeof res?.data?.photo!='undefined'){
            this.profilephoto=res?.data?.photo;
          }
          
        }

      }, (err: any) => {
        this.toastr.error(err, 'error');
        console.log(err);
        


      })
    }
   
  }
  userdata(){
 
   let userdata=this.userprofile.value;
   console.log(userdata);
   this.fb.userupdates(userdata,(ress:any)=>{
   this.toastr.success('usersdata is successfully added','success');
    
     
   },(err:any)=>{
     console.log('something error');
     this.toastr.error('something error','error');
     
   })
   
  }
      // GET IMAGE FILE PATH
      onFileChange(event: any) {
        const reader = new FileReader();
    
        if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            // Update the form control with the file path
            this.userprofile.patchValue({
              photo: reader.result
            });
          };
        }
      }
}
