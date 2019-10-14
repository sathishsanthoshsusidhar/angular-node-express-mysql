import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  // baseUrl = 'http://localhost:3000';
  baseUrl = 'http://localhost:1500';

  constructor(private http: HttpClient) { }

  addCategory(data: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/category/add', data);
  }

  GetAllCategories(): Observable<any>{
    return this.http.get(this.baseUrl + '/category').pipe(map((res: Response) => {
        return res;
      }))
  }

  getCategory(data: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/category/edit/' + data.id );
  }

  updateCategory(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/category/update/' + data._id, data);
  }
  deleteCategory(data: any) {
    return  this.http.get<any>(this.baseUrl + '/category/delete/' + data);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/product/add', data);
  }

  getProduct(data: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/product/edit/' + data.id );
  }

  updateProduct(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/product/update/' + data._id, data);
  }

  deleteProduct(data: any) {
    return  this.http.get<any>(this.baseUrl + '/product/delete/' + data);
  }

  GetAllProducts(currentPage: any, pageSize: number): Observable<any> {
    const current: any = (isNaN(currentPage)) ? 0 : currentPage;
    console.log(current);
    return this.http.get(this.baseUrl + '/product/list/' + current + '/' + pageSize).pipe(
       map((res: Response) => {
        // mergeMap(data => this.http.get(this.baseUrl + '/category').pipe(
        //   map( res => {
        //      return data;
        //   }
        // )))
        return res;
       })
      )
  }

}
