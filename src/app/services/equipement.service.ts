import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiUrl;

  addEq(data: any) {
    return this.httpClient.post(this.url +
      "/api/equipment/equipments/", data, {
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

  getEquipements(){
    return this.httpClient.get(this.url+ "/api/equipment/equipments/");
  }

  update(id:any,data:any){
    return this.httpClient.patch(this.url+"/api/equipment/equipments/"+id,data,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/api/equipment/equipments/"+id,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }

  detailseq(id:any){
    return this.httpClient.get(this.url+"/api/equipment/equipments/holders/"+id,{
      headers: new HttpHeaders().set('Content-type',"application/json")

    })
  }


}
