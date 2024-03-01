import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { Create_User } from '../contrary/create_user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44383/api/";

  constructor(private httpClient: HttpClient) { }

  async Create(user: User): Promise<Create_User> {
    try {
      const result = await this.httpClient.post<Create_User>(this.apiUrl + "auth/register", user).toPromise();
      if (result) {
        return result as Create_User;
      } else {
        throw new Error('Response is undefined');
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('HTTP request failed:', error.status, error.statusText);
        throw new Error('HTTP request failed');
      } else if (error instanceof TypeError) {
        console.error('Response is undefined');
        throw new Error('Response is undefined');
      } else {
        console.error('An unexpected error occurred:', error);
        throw new Error('An unexpected error occurred');
      }
      
    }
  
  }
}
