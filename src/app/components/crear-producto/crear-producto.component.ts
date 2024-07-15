import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';

import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit  {
  productoForms: FormGroup;

  constructor(private fb:FormBuilder, private router:Router,private toastr: ToastrService, 
    private _productoService:ProductoService){
    this.productoForms = this.fb.group({
      producto:['',Validators.required],
      categoria:['',Validators.required],
      ubicacion:['',Validators.required],
      precio:['',Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  

  agregarProducto(){
    
    const PRODUCTO:Producto ={
      nombre: this.productoForms.get('producto')?.value,
      categoria: this.productoForms.get('categoria')?.value,
      ubicacion: this.productoForms.get('ubicacion')?.value,
      precio: this.productoForms.get('precio')?.value
    }

    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data=>{
        this.toastr.success('El producto fue registrado con exito!','Producto registrado');
        this.router.navigate(['/']);
    }, error =>{
      console.log(error);
      this.toastr.error('Hubo un problema al dar de alta el prodcuto','Error');
      this.productoForms.reset();

    })

    

  }

  

}
