import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminConfig} from '../../AdminConfig';
import {UserInterface} from '../../entity/user/user-interface';
import {User} from '../../entity/user/user';
import { catchError } from 'rxjs/operators';
import {pipe, throwError} from 'rxjs';
import {UserListResponse} from '../../entity/UserList/user-list-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {}

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  getAllUsers() {
    return this.httpClient.get<UserListResponse>(
      `${AdminConfig.allUsersAPI}`, {responseType: 'json'}
    ).pipe(catchError(UserService.errorHandler));
  }

  getUserByUser(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<UserInterface>(
        AdminConfig.userAPI,
        JSON.stringify({user: userId}),
        httpOptions
    );
  }

  // Admin Section - Add User Page
  postAddUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<User>(
        AdminConfig.addUserAPI,
        JSON.stringify(user),
        httpOptions
    ).subscribe(
        data => {
          // TODO insert ngx-toastr Message
          console.log('the post request was successfully done', data);
          // If Success Navigate to Admin Dashboard Page
        },
        error => {
          // TODO insert ngx-toastr Message
          console.log('there error from fetching the data', error);
        },
        () => {
          this.router.navigate(['admin/list-users']);
        }
    );
  }

  // Admin Section - Update User
  updateUser(userId: string, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<UserInterface>(
        AdminConfig.editUserAPI,
        JSON.stringify(data),
        httpOptions
    ).pipe(catchError(UserService.errorHandler));
  }

  // Admin Section - Delete User
  deleteUser(userId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(
        AdminConfig.deleteUserAPI,
        JSON.stringify({id: userId}),
        httpOptions
    ).pipe(catchError(UserService.errorHandler));
  }

}
