import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AbstractControl, FormControl, FormGroup,ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthLibService } from '../../../../../projects/auth-lib/src/public-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authLibService =inject(AuthLibService);
  private readonly router = inject(Router);


  registerForm:FormGroup = new FormGroup({
    username:new FormControl(null, [Validators.required] ),
    firstName:new FormControl(null, [Validators.required] ),
    lastName:new FormControl(null, [Validators.required] ),
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)] ),
    rePassword:new FormControl(null, [Validators.required] ),
    phone:new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, { validators:this.confirmPassword } );

  

  register(){
    this.authLibService.register(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === "success")
          {
            setTimeout(()=>{
              this.router.navigate(['/signin']);
            }, 500)

            
          }

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  confirmPassword(group : AbstractControl){
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : {mismatch:true};

  }

}
