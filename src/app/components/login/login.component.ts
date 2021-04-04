import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  baseUrl= 'https://localhost:44334/';
  logo = this.baseUrl + "images/logo.jpg" ;
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService,
    private toastrService:ToastrService,private localStorageService:LocalStorageService,
     private router:Router, 
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message);
        this.localStorageService.setItem("token", response.data.token);
        this.localStorageService.setItem('email',this.loginForm.value.email);

        this.toastrService.success("Giriş başarılı");
        this.router.navigate(["/"]).then(r => window.location.reload());
      },responseError=>{
        this.toastrService.error("Girdiğiniz e-posta veya şifre yanlış.",responseError.error);
      })
    }
  }
}