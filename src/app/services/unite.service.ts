import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private httpClient: HttpClient) { }

  url =  localStorage.getItem('adresse');

  addUnite(data: any) {
    return this.httpClient.post(this.url +
      "/api/holder/unites/", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  forgotPassword(data:any){
     return this.httpClient.post(this.url+
      "/user/forgotPassword/",data,{
        headers: new HttpHeaders().set('Content-type',"application/json")
      })
  }
  login(data:any){
    return this.httpClient.post(this.url+
      "/api/login/",data,{
        headers: new HttpHeaders().set('Content-type',"application/json")
      })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  changePassword(data:any){
    return this.httpClient.post(this.url+
      "/user/changePassword",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      })
  }

  getUnites(){
    return this.httpClient.get(this.url+ "/api/holder/unites/");
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/holder/unites/"+id,data,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/holder/unites/"+id,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }


}
