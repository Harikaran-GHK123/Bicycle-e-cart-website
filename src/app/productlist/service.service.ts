import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 10.99, imageUrl: '../../../assets/e-cart/cycle2.jpg' },
    { id: 2, name: 'Product 2', price: 24.99, imageUrl: "../../../assets/e-cart/cycle3.jpg" },
    { id: 3, name: 'Product 3', price: 14.5, imageUrl: "../../../assets/e-cart/midimg1.jpg" },
    { id: 4, name: 'Product 4', price: 10.99, imageUrl: "../../../assets/e-cart/cycle1.avif" },
    { id: 5, name: 'Product 5', price: 24.99, imageUrl: "../../../assets/e-cart/midimg3.jpg" },
    { id: 6, name: 'Product 6', price: 14.5, imageUrl: "../../../assets/e-cart/midimg2.jpg" },
  ];

  getproductlist():Product[]{
    return this.products;
  }
  getProductById(id: number): any {
    return this.products.find(product => product.id === id);
  }
 


 
}
export interface Product {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
}