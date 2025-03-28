import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AbstractControl, FormControl, FormGroup,ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthLibService } from '../../../../../projects/auth-lib/src/public-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  private readonly authLibService = inject(AuthLibService);
  private readonly router = inject(Router);

 

  loginForm:FormGroup = new FormGroup({
      
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)] ),
    
  } );

 

  login(){
    this.authLibService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === "success")
          {
            setTimeout(()=>{
             //1-save token
             localStorage.setItem("token",res.token)

             //2-decode token
             this.authLibService.getUserData()

             //3-navigate to home
             this.router.navigate(['/home']);
            }, 500)

          
          }

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

 


}