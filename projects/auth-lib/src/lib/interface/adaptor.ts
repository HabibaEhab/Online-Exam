export interface Adaptor {

    adapt(data:any):any

    adaptForgetPass(data:any):any

    adaptVerifyCode(data:any):any

    adaptResetPass(data:any):any
}
