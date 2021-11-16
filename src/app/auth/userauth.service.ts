import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserAuth } from './userauth.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserAuthService {
  user = new BehaviorSubject<UserAuth>(null);
  isAuthenticated = new Subject<boolean>();
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(useremail: string, userpassword: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvt8c4tFl1byo7bwDpUiRq5-SQTX3-te0',
        {
          email: useremail,
          password: userpassword,
          returnSecureToken: true,
        },
        {
          headers: new HttpHeaders({
            // accept: '*/*',
            //'accept-language': '*',
            //'content-language': '*',
            //'content-type': 'application/json',
          }),
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
          return responseData;
        })
      );
  }

  signIn(useremail: string, userpassword: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvt8c4tFl1byo7bwDpUiRq5-SQTX3-te0',
        {
          email: useremail,
          password: userpassword,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
          return responseData;
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new UserAuth(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  signOut() {
    this.isAuthenticated.next(false);
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  handleAuthentication(
    email: string,
    userid: string,
    token: string,
    expiresIn: string //3600   2021-11-12 05:13:50:  + 3600
  ) {
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 2 * 1000
    );
    // There is issue with JSON.stringify while converting date oject to sting as it works with TimeZone.
    // To be checked further how to handle it.
    const user = new UserAuth(email, userid, token, expirationDate);
    this.isAuthenticated.next(true);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesnt exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password entered is invalid';
        break;
      case 'USER_DISABLED':
        errorMessage = 'You are not allowed to access';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
    }
    return throwError(errorMessage);
  }
}
