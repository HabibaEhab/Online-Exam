import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';
import { LoginAPIData, LoginResponse } from '../interface/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor {

  constructor() { }

  adapt(data:LoginAPIData):LoginResponse{
    return {//whatever i want from the api reponse
      message:data.message,
      token:data.token,
      userEmail:data.user.email
    }

  }

  adaptForgetPass(data: any) {
      return{
        message: data.message,
        info: data.info
      }
  }

  adaptVerifyCode(data:any) {
      return{
        status: data.status
      }
  }

  adaptResetPass(data: any) {
      return{
        message:data.message,
        token: data.token
      }
  }


}
