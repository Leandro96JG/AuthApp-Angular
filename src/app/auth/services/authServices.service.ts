import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckToken, LoginResponse, User } from '../interfaces';
import { RegisterResponse } from '../interfaces/register-response.interfaces';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl:string = environments.baseUrl;
  private httpclient = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! public, con esto nadie fuera de mi service puede cambiar los datos

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=>this._authStatus());

  constructor() { }


  login(email:string, password:string):Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};
    return this.httpclient.post<LoginResponse>(url,body)
    .pipe(
      tap(({user,token})=>{
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token',token);
        console.log({user, token})
      }),
      map(()=>true),
      //Todo: errores
      catchError(err => {
        console.log(err);
        return throwError(()=>err.error.message)
      })
    );

  }

  checkAuthStatus():Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');
    if(!token) return of (false);

    const headers = new HttpHeaders()
     .set('Authorization',`Bearer ${token}`);


     return this.httpclient.get<CheckToken>(url,{headers})
      .pipe(
        map(({token,user}) =>{
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token',token);
        return true;
        }),
        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      );
  }

  // register(email:string, name:string; password:string):Observable<boolean>{
  //   const url = `${this.baseUrl}/auth/register`;
  //   const body = {email, name, password};

  //   return this.httpclient.post<RegisterResponse>(url,body)
  //   .pipe(
  //     tap((user,token)=>{
  //       this
  //     }),
  //     map(()=>true)
  //   )
  // }

}
