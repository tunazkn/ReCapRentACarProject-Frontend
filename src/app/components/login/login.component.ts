import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo = environment.baseUrl + "images/logo.jpg" ;
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService,
    private toastrService:ToastrService, private router:Router) { }

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
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value);
      
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message);
        localStorage.setItem("token", response.data.token);
        this.toastrService.success("Giriş başarılı");
        this.router.navigate(["/"]);
      },responseError=>{
        //console.log(responseError.eror);
        this.toastrService.error("Girdiğiniz e-posta veya şifre yanlış.",responseError.error);
      })
    }
  }
}