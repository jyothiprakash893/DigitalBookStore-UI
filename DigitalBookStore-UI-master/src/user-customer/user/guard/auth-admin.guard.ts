import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userService.isUserLoggedIn() && this.userService.isAdmin()) {
            // console.log("return true:");
            return true;
        } else if (this.userService.isUserLoggedIn() && !this.userService.isAdmin()) {
            alert("Not authorized");
            return false;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
    }
}