import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementagsService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  addEqTag(data: any) {
    return this.httpClient.post(this.url +
      "/api/equipment/tagequipments/", data, {
      headers: new HttpHeaders().set('Content-type',"application/json")
    });
  }

  forgotPassword(data:any){
     return this.httpClient.post(this.url+
      "/api/holder/grades/",data,{
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

  getEquipementags(){
    return this.httpClient.get(this.url+ "/api/equipment/tagequipments/");
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/equipment/tagequipments/"+id,data,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/equipment/tagequipments/"+id,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }


}
