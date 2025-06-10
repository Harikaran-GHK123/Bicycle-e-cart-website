import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contac-us',
  templateUrl: './contac-us.component.html',
  styleUrls: ['./contac-us.component.scss']
})
export class ContacUsComponent implements OnInit {
  contactform!:FormGroup;

  constructor(){}
  ngOnInit(){
    this.contactform= new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required])
    
    });
  }

  oncontact(){
    alert('Submited');
    this.contactform.reset();
  }

}
