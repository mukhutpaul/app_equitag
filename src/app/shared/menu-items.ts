import { Injectable } from "@angular/core";

export interface Menu{
    state:String;
    name:String;
    icon:String;
    role:String;
}

const MENUITEMS = [
  
    {state:'dashboard',name:'Dashboard',icon:'dashboard',role:''},
    {state:'category',name:'Manage Category',icon:'category',role:'admin'},
    {state:'product',name:'Manage Product',icon:'inventory_2',role:'admin'},
    {state:'order',name:'Manage Order',icon:'list_alt',role:''},
    {state:'bill',name:'View Bill',icon:'import_contacts',role:''},
    {state:'user',name:'Manage User',icon:'people',role:'admin'}

];

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}