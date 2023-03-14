import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  addCategorie(data: any) {
    return this.httpClient.post(this.url +
      "/api/holder/categories/", data, {
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

  getCategories(){
    return this.httpClient.get(this.url+ "/api/holder/categories/");
  }

  updateCat(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/holder/categories/"+id,data,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/holder/categories/"+id,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }


}
