import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private MyAppUrl = "https://localhost:5001/";
  private MyApiUrl = "api"

  rolSession:number = 0;

  constructor(private http: HttpClient) { }

  getListProductos() : Observable<any> {
    return this.http.get(this.MyAppUrl + this.MyApiUrl + "/Productos")
  }
  getListProductosOptimos() : Observable<any> {
    return this.http.get(this.MyAppUrl + this.MyApiUrl + "/ProductosOptimos")
  }
  getListProductosDefectuosos() : Observable<any> {
    return this.http.get(this.MyAppUrl + this.MyApiUrl + "/ProductosDefectuosos")
  }
  guardarProducto(producto: any):Observable<any>{
    return this.http.post(this.MyAppUrl + this.MyApiUrl + "/GuardarProducto", producto)
  }
  marcarProductoOptimo(producto: any):Observable<any>{
    return this.http.patch(this.MyAppUrl + this.MyApiUrl + "/MarcarProductoOptimo",producto)
  }
  marcarProductoDefectuoso(producto: any):Observable<any>{
    return this.http.patch(this.MyAppUrl + this.MyApiUrl + "/MarcarProductoDefectuoso", producto)
  }

  //Users

  GetUserList() : Observable<any> {
    return this.http.get(this.MyAppUrl + this.MyApiUrl + "/GetUserList")
  }

  GetUserAuth(user: any):Observable<any>{
    return this.http.post(this.MyAppUrl + this.MyApiUrl + "/GetUserAuth", user)
  }

  UspertUser(user: any):Observable<any>{
    return this.http.post(this.MyAppUrl + this.MyApiUrl + "/UspertUser", user)
  }

  setRol(input: number)
  {
    localStorage.setItem("objListVariables",input.toString());
  }

  getRol()
  {
    let rol = localStorage.getItem("objListVariables");

    if(rol != undefined && rol != null)
    {
        return +rol;
    }

    return 0;
  }
}
