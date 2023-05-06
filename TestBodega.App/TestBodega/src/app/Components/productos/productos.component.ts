import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/Services/producto.service';
import { ProductModel } from './productmodel';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {Injectable, ElementRef} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listProductos: any[] = [];
  listProductosOptimos: any[] = [];
  listProductosDefectuosos: any[] = [];

  $report: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  accion = "Agregar";
  form: FormGroup;
  showtable1 = true;
  showtable2 = false;
  table1: FormGroup;
  table2: FormGroup;
  

constructor (private fb: FormBuilder, private _productoService: ProductoService,
  private router: Router) 
{
  this.form = this.fb.group({
    nombre:['', [Validators.required,Validators.maxLength(10), Validators.minLength(2)]],
    stock:['', [Validators.required]]
  });
  this.table1 = this.fb.group({
    
  });
  this.table2 = this.fb.group({
    
  });

 
}
ngOnInit(): void {
  this.obtenerProductos();
  this.obtenerProductosOptimos();
  this.obtenerProductosDefectuosos();
}



obtenerProductos(){
  this._productoService.getListProductos().subscribe(data => 
    {
      console.log(data);
      this.listProductos = data;
    }, error => 
    {
      console.log(error);
    }
    )
}
obtenerProductosOptimos(){
  this._productoService.getListProductosOptimos().subscribe(data => 
    {
      console.log(data);
      this.listProductosOptimos = data;
    }, error => 
    {
      console.log(error);
    }
    )
}
obtenerProductosDefectuosos(){
  this._productoService.getListProductosDefectuosos().subscribe(data => 
    {
      console.log(data);
      this.listProductosDefectuosos=data;
   
    }, error => 
    {
      console.log(error);
    }
    )
}

agregarProducto(){
  const producto: any =
  {
    Nombre: this.form.get('nombre')?.value,
    Stock: this.form.get('stock')?.value,
  }
      this._productoService.guardarProducto(producto).subscribe(data =>{
        this.obtenerProductos();
        this.form.reset();
      },error => {
        console.log(error)
      })
}

marcarOptimo(producto : any){
  this._productoService.marcarProductoOptimo(producto).subscribe(data => {
    this.obtenerProductos();
  },error=>{
    console.log(error);
  })
}

marcarDefectuoso(producto : any){
  this._productoService.marcarProductoDefectuoso(producto).subscribe(data => {
    this.obtenerProductos();
  },error=>{
    console.log(error);
  })
}


exportToExcel() {
  var jsonstring = JSON.stringify(this.listProductos);
  var data = JSON.parse(jsonstring);

  let dataToExport = data.map((item : any) => {
    return {
      'CódigoProducto': item.codigoProducto,
      'NombreProducto': item.nombre,
      'Stock': item.stock,
      'Estado': item.estado,
      'FechaRegistro': item.fechaRegistro
    };
  });
  this.exportJsonToExcel(dataToExport, 'Prodcutos');
}


public exportTableElmToExcel(element: ElementRef, fileName: string): void {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element.nativeElement);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws, 'Data');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

public exportJsonToExcel(data: any[], fileName: string): void {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws, 'Data');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

// eliminarCliente(id: number){
//     this._clienteService.deleteCliente(id).subscribe(data=>{
//     this.toastr.success('El cliente fue eliminado!', 'Operacion exitosa');
//     this.obtenerCliente();
//   }, error => 
//   {
//     console.log(error);
//     this.toastr.error(`Se presenta el siguiente error: ${error.error}`, 'Operacion fallida');
//   })
  
// }
// actualizarCliente(cliente: any){
//   console.log(cliente);
// this.accion="Actualizar";
// this.id = cliente.id;

// this.form.patchValue({
//   TipoIdentificacion: cliente.tipoIdentificacion,
//   NumeroIdentificacion: cliente.numeroIdentificacion,
//   Nombre: cliente.nombre,
//   Apellido: cliente.apellido,
//   Email: cliente.email,
//   FechaNacimiento: cliente.fechaNacimiento
// })
// }



}
