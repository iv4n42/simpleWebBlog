import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }
  baseURL = "http://localhost:3000"
  getPosts(posts : string) {
    return(this.http.get(`${this.baseURL}/${posts}`))
  }
  makePost(data: any,options :any){
    return(this.http.post("http://localhost:3000/posts",data,options))
  }
}
