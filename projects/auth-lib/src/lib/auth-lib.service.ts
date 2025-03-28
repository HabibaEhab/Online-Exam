import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthAPI } from './base/AuthAPI';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoint } from './enums/AuthAPI.endpoints';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { LoginData } from './interface/loginData';
import { LoginResponse } from './interface/loginResponse';
import { RegisterData } from './interface/registerData';
import { ForgetPassData } from './interface/forgetPassData';
import { VerifyCodeData } from './interface/verifyCodeData';
import { ForgetPassRes } from './interface/forgetPassRes';
import { verifyCodeRes } from './interface/verifyCodeRes';
import { ResetPassRes } from './interface/resetPassRes';
import { BASE_URL } from './base-url.tokens';
import { jwtDecode } from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class AuthLibService implements AuthAPI {

  constructor(private httpClient:HttpClient, private authAPIAdaptorService:AuthAPIAdaptorService,
     @Inject(BASE_URL) private baseUrl:string) { }


     userData:any;

  private getUrl(endpoint:string):string{
      return `${this.baseUrl}${endpoint}`;
  }



  login(data:LoginData): Observable<LoginResponse>{
    return this.httpClient.post(this.getUrl(AuthEndPoint.LOGIN), data).pipe(
      map((res:any)=>this.authAPIAdaptorService.adapt(res)),
      catchError((err)=>throwError(() => err))
    )

  }

  register(data:RegisterData): Observable<LoginResponse>{
    return this.httpClient.post(this.getUrl(AuthEndPoint.REGISTER), data).pipe(
      map((res:any)=>this.authAPIAdaptorService.adapt(res)),
      catchError((err)=>throwError(() => err))
    )

  }

  forgetPassword(data:ForgetPassData): Observable<ForgetPassRes> {
    return this.httpClient.post(this.getUrl(AuthEndPoint.FORGET_PASSWORD), data).pipe(
      map((res:any)=>this.authAPIAdaptorService.adaptForgetPass(res)),
      catchError((err)=> of(err))
    )
      
  }

  verifyCode(data:VerifyCodeData): Observable<verifyCodeRes> {
    return this.httpClient.post(this.getUrl(AuthEndPoint.VERIFY_CODE), data).pipe(
      map((res:any)=>this.authAPIAdaptorService.adaptVerifyCode(res)),
      catchError((err)=> of(err))
    )
  }

   resetPassword(data:LoginData): Observable<ResetPassRes> {
    return this.httpClient.put(this.getUrl(AuthEndPoint.RESET_PASSWORD), data).pipe(
      map((res:any)=>this.authAPIAdaptorService.adaptResetPass(res)),
      catchError((err)=> of(err))
    )  
  }

  getUserData():void{
    this.userData = jwtDecode(localStorage.getItem("token") !)
    console.log(this.userData)

  }

}
