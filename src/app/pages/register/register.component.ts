import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalServiceService } from 'src/app/localstorageservice/local-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';







@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerform!: FormGroup;
  loginform!: FormGroup;
  userprofile!: FormGroup;
  localdata!: any;
  profilephoto!:any;
  isempty: boolean = false;


  constructor(public fb: CrudService, public localstorageservice: LocalServiceService, public toastr: ToastrService, public router: Router) {
    // document.getElementById("")!.modal('show');


  }
  ngOnInit() {
    this.registerform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userType: new FormControl('general', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      status: new FormControl(true),
      cart: new FormControl([])
    });
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      userpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    this.userprofile = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      number: new FormControl('', [ Validators.minLength(10)]),
      city: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
    });

    this.localdata = this.localstorageservice.getItem('authkey');

    if (this.localdata != null && this.localdata.userType == 'general') {
      this.fb.trigerloader(true);
      this.fb.getuseronce(this.localdata, (res: any) => {
        this.fb.trigerloader(false);
     

        if(res.data.userType=="general"){
         

          
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
    else if(this.localdata != null && this.localdata.userType != 'general'){
      this.router.navigate(['/dash_board/user'])
    }

  }

  onregiester() {
    console.log(this.registerform.value);
    let regeform = this.registerform.value;

    this.fb.getuseronce(regeform, (res: any) => {

      if (!res.Response) {
        this.fb.regiesteruser(regeform, (resolve: any) => {
          let localstoragedata = {
            username: regeform.username,
            userType: regeform.userType

          }
          this.localstorageservice.setItem('authkey', localstoragedata)
          this.registerform.reset()
          this.toastr.success('user regiesterd successfully', 'success');


          if (regeform.userType == 'admin') {
            this.router.navigate(['/dash_board'])
          } else {
            this.router.navigate(['/home'])
          }

        }, (reject: any) => {
          this.toastr.error('regiestration faild', 'faild')
        })
      }
      else {
        this.toastr.info('user is allready exist', 'error');
      }

    }, (err: any) => {
      this.toastr.error(err, 'error');


    })




  }

  onlogin() {
    let loginform = this.loginform.value;
    this.fb.getusernamepassword(loginform, (resolve: any) => {
      console.log(resolve);

      if (!resolve) {
        this.toastr.error('your not regiesterd', 'error');
      }
      else {
        
        if(resolve.data.password==loginform.userpassword){
          this.toastr.success('successfully log in', 'Success');
          let localstoragedata = {
            username: resolve.data.username,
            userType: resolve.data.userType

          }
          this.localstorageservice.setItem('authkey', localstoragedata)
          if (resolve.data.userType == 'admin') {
            this.router.navigate(['/dash_board'])
          } else {
            this.router.navigate(['/home'])
          }
        }else{
          this.toastr.error('Password not match', 'Login failed');
        }

       
      }

    }, (rejects: any) => {
      this.toastr.error('user is not exist', 'rejects');


    })


  }

  userdata() {
    let userdata=this.userprofile.value;
    console.log(userdata);
    this.fb.userupdates(userdata,(ress:any)=>{
    this.toastr.success('usersdata is successfully added','success');
     
      
    },(err:any)=>{
      console.log('something error');
      this.toastr.error('something error','error');
      
    })
    
   }

   logout(){
    this.localstorageservice.removeItem('authkey')
    this.router.navigate(['/home'])
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
