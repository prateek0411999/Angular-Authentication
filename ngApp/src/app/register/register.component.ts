import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData={
    email: '',
    password: ''
  }

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res=> {localStorage.setItem('token',res.token),
      //navigate using the router
      this._router.navigate(['/special'])
    },
      err => console.log(err)
    )
  }
  }

