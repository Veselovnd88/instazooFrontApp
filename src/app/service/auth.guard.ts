import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";
import {state} from "@angular/animations";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const tokenService = inject(TokenStorageService);
  const currentUser = tokenService.getUser();
  if (currentUser) {
    return true;
  }
  router.parseUrl('/login');
  return false;
}

