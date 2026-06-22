import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/User';
import { Role } from '../model/role';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface UserDetailsResponse {
  id: number;
  userId: number;
  name: string;
  phoneNumber: string;
  profileImage: string;
  statusCode: number;
  message: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiHostUrl;
  loginEndpoint = "/user/auth/login";
  registerEndpoint = "/user/auth/register";
  getcreditsEndpoint="/user/get-user-credits/{userid}";
  addcreditsEndpoint = "/user/add-credits/{userid}/{amount}";
  forgotPasswordEndpoint = "/user/auth/forgot-password";
  resetPasswordEndpoint = "/user/auth/reset-password";

  getcreitdsurl:string=this.apiUrl+this.getcreditsEndpoint;
  addcreitdsurl:string=this.apiUrl+this.addcreditsEndpoint;
  authenticateURL: string = this.apiUrl + this.loginEndpoint;
  registerURL: string = this.apiUrl + this.registerEndpoint;

  forgotPasswordURL: string = this.apiUrl + this.forgotPasswordEndpoint;
  resetPasswordURL: string = this.apiUrl + this.resetPasswordEndpoint;
 
  user!: User;
  authenticated: boolean = false;
  users!: User[];
  loggedInUser: User | null = null;

  private userDetailsUrl = `${this.apiUrl}/user`;

//   private changePasswordUrl = `${this.apiUrl}/user/change-password`;
  private changePasswordUrl = `${this.apiUrl}/user`; 
  private closeAccountUrl = `${this.apiUrl}/user/close-account`;
  private userReviewsUrl = `${this.apiUrl}/user/reviews`;

  constructor(private http: HttpClient, private router: Router) {}

    authenticate(email: string, password: string): Observable<User> {
        const credentials = { email: email, password: password };
        let statusCode: number | null = null;  
        return this.http.post<User>(this.authenticateURL, credentials).pipe(
            tap(
                (response: User) => {
                    if (response && response.token && response.role && response.userId) {
                        this.authenticated = true;
                        this.loggedInUser = response;
                        sessionStorage.setItem('email', response.email);
                        sessionStorage.setItem('token', response.token);
                        sessionStorage.setItem('role', response.role);
                        sessionStorage.setItem('userId', response.userId.toString());
                        sessionStorage.setItem('name', response.name || '');
                        // const decode = jwt_decode<TokenPayload>(token);
                    } else {
                        this.authenticated = false;
                        this.loggedInUser = null;
                        sessionStorage.clear();
                    }
                },
            ),
            catchError((error) => {
                this.authenticated = false;
                this.loggedInUser = null;
                sessionStorage.clear();
                statusCode = error.status;  

                console.error(`Login failed with status code ${statusCode}:`, error);
                alert(`Login failed. Error code: ${statusCode}`);
                return throwError(() => error);
            })
        );
    }

    // registerUser(user: User): Observable<User> {
    //     return this.http.post<User>(this.registerURL, user).pipe(
    //         tap(response => {
    //             if (response?.statusCode !== 200 && response?.statusCode !== 201) {
    //                 return throwError(() => response);
    //             }
    //             return response;
    //         }),
    //         catchError(error => {
    //             console.error("Registration error:", error);
    //             return throwError(() => error);
    //         })
    //     );
    // }
    registerUser(user: User): Observable<User> {
      return this.http.post<User>(this.registerURL, user).pipe(
        tap(response => {
          
          return response;
        }),
        catchError(error => {
          console.error("Registration error:", error);
          return throwError(() => error);
        })
      );
    }

 
    getUserDetails(userId: number): Observable<UserDetailsResponse> { 
        return this.http.get<UserDetailsResponse>(`${this.userDetailsUrl}/${userId}/details`);
      }
    
      updateUser(userId: number, updatedUser: Partial<User>): Observable<any> {
        return this.http.put<any>(`${this.userDetailsUrl}/${userId}`, updatedUser); 
      }
    
      // New method to update user details with profile image
      updateUserDetails(userId: number, formData: FormData): Observable<UserDetailsResponse> {
        return this.http.put<UserDetailsResponse>(`${this.userDetailsUrl}/${userId}/details`, formData);
      }
    

    //   changePassword(userId: number, passwords: any): Observable<any> {
    //     return this.http.put<any>(`${this.apiUrl}/user/${userId}/change-password`, passwords);
    //   }
    changePassword(userId: number, passwords: any): Observable<any> {
        let params = new HttpParams()
          .set('oldPassword', passwords.oldPassword)
          .set('newPassword', passwords.newPassword);
    
        return this.http.put<any>(`${this.apiUrl}/user/${userId}/change-password`, {}, { params });
      }


      getAllUsersAdmin(): Observable<User[]> {  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`  
        });
        return this.http.get<User[]>(`${this.apiUrl}/user/admin/get-all-users`, { headers });
      }
      
      deleteUserAdmin(userId: number): Observable<any> {  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`  
        });
         
        return this.http.delete<any>(`${this.apiUrl}/user/admin/deleteUser/${userId}`, { headers });
      }
    

    getUserCredit(userId: number): Observable<{ userId: number; credits: number }> {
        return this.http.get<{ userId: number; credits: number }>(`${this.apiUrl}/user/get-user-credits/${userId}`);  
    }

    addCredits(userId: number, amount: number): Observable<{ userId: number; credits: number; statusCode: number; message: string }> {
        return this.http.put<{ userId: number; credits: number; statusCode: number; message: string }>(`${this.apiUrl}/user/add-credits/${userId}/${amount}`, {});  
    }

    getUserReviews(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.userReviewsUrl}/${userId}`);
    }

    closeAccount(userId: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`  
      });
       
      return this.http.delete<any>(`${this.apiUrl}/user/admin/deleteUser/${userId}`, { headers });
    }

    forgotPassword(email: string): Observable<string> {
      return this.http.post(this.forgotPasswordURL, { email }, { responseType: 'text' });  
    }
    
    
    
    resetPassword(resetData: { token: string, newPassword: string, confirmPassword: string }): Observable<string> {
      return this.http.post(this.resetPasswordURL, resetData, { responseType: 'text' }); 
    }

    isUserLoggedIn(): boolean {
        return !!sessionStorage.getItem('token');
    }

    getLoggedInUserRole(): string | null {
        return sessionStorage.getItem('role');
    }

    isAdmin(): boolean {
        const role = this.getLoggedInUserRole();
        return role === Role.ADMIN;
    }

    isCustomer(): boolean {
        const role = this.getLoggedInUserRole();
        return role === Role.CUSTOMER;
    }

    logOut() {
        this.authenticated = false;
        this.loggedInUser = null;
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('name');
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login']);
    }
}