import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel, registerModel } from '../models/loginPage';
import { response } from '../models/responseDto';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserStoreService } from './user-store.service';
import { tokenAPI } from '../models/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7279/api/User";
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router, private userStore: UserStoreService) {

  }

  signUp(register: registerModel): Observable<response> {
    return this.http.post<response>(`${this.baseUrl}/register`, register);
  }

  getUsers(): Observable<response> {
    return this.http.get<response>(`${this.baseUrl}/getusers`);
  }

  login(model: loginModel): Observable<response> {
    return this.http.post<response>(`${this.baseUrl}/authenticate`, model).pipe(
      map((response: response) => {
        if (response.status && response.response) {
          const { accessToken, refreshToken } = response.response;
          if (accessToken && refreshToken) {
            this.storeToken(accessToken);
            this.storeRefreshToken(refreshToken)
          }
        }
        console.log('api here')
        return response;
      })
    );
  }

  renewToken(tokenApi: tokenAPI): Observable<response> {
    return this.http.post<response>(`${this.baseUrl}/refresh`, tokenApi)
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue)
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('accessToken', tokenValue)
    console.log('accessToken', tokenValue)
    this.userPayload = this.decodeToken(tokenValue)
    if (this.userPayload) {
      this.userStore.setUserNameForStore(this.userPayload.unique_name)
      this.userStore.setRoleForStore(this.userPayload.role)
    }
  }

  getToken() {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  isloggedIn(): boolean {
    return !!localStorage.getItem('accessToken')
  }

  decodeToken(token: string) {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token)
  }

  getUserNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role
    }
  }
}
