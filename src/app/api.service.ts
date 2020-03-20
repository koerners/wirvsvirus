import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiURL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }


  public getJoke() {
    return this.httpClient.get('https://official-joke-api.appspot.com/random_joke', {responseType: 'json'});
  }


}
