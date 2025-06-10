import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from 'src/app/localstorageservice/local-service.service';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  hideHeader: boolean = false;
  hideFooter: boolean = false;
  lodervisible: boolean = false;
  disablepopup: boolean = false;

  constructor(private router: Router, public toastr: ToastrService, public localstorage: LocalServiceService, public curdservice: CrudService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the dashboard route
        let userurl = event.url;
        const isDashboardRoute = userurl.includes('/dash_board');

        // Hide header and footer if the dashboard route is active
        this.hideHeader = isDashboardRoute;
        this.hideFooter = isDashboardRoute;


      }
    });
  }
  ngOnInit() {
    this.curdservice.$loader.subscribe((vissible: boolean) => {
      this.lodervisible = vissible;

    });
    this.curdservice.$disablepopup.subscribe((vissible:boolean)=>{
      this.disablepopup=vissible;
    })
    document.getElementById('pre-screen')?.remove();
  }
  scrolltop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    let routerurl = this.router.url;

    if (routerurl.includes('/dash_board')) {
      let localdata = this.localstorage.getItem('authkey')

      if (localdata != null && localdata.userType == 'general') {
        this.router.navigate(['/home']);
      };
      if (localdata == null) {
        this.router.navigate(['/regiter'])
      }

    }



  }
  showSuccess() {
    this.toastr.success('Hello, this is a success toast!', 'Success');
    console.log('sucess');

  }

  showError() {
    this.toastr.error('Oops, something went wrong!', 'Error');
  }

  showWarning() {
    this.toastr.warning('Be careful!', 'Warning');
  }

  showInfo() {
    this.toastr.info('This is just an informational message.', 'Info');
  }


  logout() {
    this.localstorage.removeItem('authkey')
    this.curdservice.triggereddisablepopup(false)
    this.router.navigate(['/home'])
  }

}
