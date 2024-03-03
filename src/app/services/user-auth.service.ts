import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from '../contrary/token/token.Response';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  apiUrl = 'https://localhost:44383/api/';
  constructor(private httpClient: HttpClient, private toastrService: CustomToastrService) {}

  async login(email: string, password: string): Promise<TokenResponse> {
    try {
      const response: any = await this.httpClient
        .post<any>(this.apiUrl + 'auth/login', { email, password })
        .toPromise();
      // debugger;
      const tokenResponse: TokenResponse = response as TokenResponse;
      localStorage.setItem('accessToken', tokenResponse.data.token);
    // localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);

      this.toastrService.message('User login successful', 'Login Success', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });

      return tokenResponse;
    } catch (error) {
      throw new Error('HTTP request failed');
    }
  }
}
  //  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void): Promise<any> {
  //   try {
  //    const observable: Observable<any | TokenResponse> = this.httpClient.post<any>(this.apiUrl + 'auth', { refreshToken });
  //      const tokenResponse: TokenResponse = await observable.toPromise();

  //     if (tokenResponse) {
  //       localStorage.setItem('accessToken', tokenResponse.token.accessToken);
  //      // localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
  //     }

  //     if (callBackFunction) {
  //      callBackFunction();
  //      }
  //    } catch (error) {
  //      throw new Error('HTTP request failed');
  //    }
  //  }

