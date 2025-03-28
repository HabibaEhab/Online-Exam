import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLibService } from '../../../../../projects/auth-lib/src/public-api';


@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly authLibService = inject(AuthLibService)
  private readonly router = inject(Router)

  step:number = 1;

  forgotPass:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required, Validators.email] )
  })

  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required] )
  })

  restPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required, Validators.email] ),
    newPassword:new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)] )
  })




forgetPassSubmit():void{
  this.authLibService.forgetPassword(this.forgotPass.value).subscribe({
    next: (res)=>{
      console.log(res);
      if(res.message === 'success'){
        this.step = 2;
      }
    },
    error:(err)=>{
      console.log(err)
    }

  })
}

verifyCodeSubmit(){
  this.authLibService.verifyCode(this.verifyCode.value).subscribe({
    next: (res)=>{
      console.log(res);
      if(res.status === 'Success'){
        this.step = 3;
      }
      
    },
    error:(err)=>{
      console.log(err)
    }

  })
}

resetPassSubmit(){
  this.authLibService.resetPassword(this.restPassword.value).subscribe({
    next: (res)=>{
      console.log(res);
       // localStorage.setItem('userToken', res.token);
      this.router.navigate(['/signin']);
      
    },
    error:(err)=>{
      console.log(err)
    }

  })

  
}




}
