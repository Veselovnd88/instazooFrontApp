import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {TokenStorageService} from "./token-storage.service";

export const authGuard = () => {
  const router = inject(Router);
  const tokenService = inject(TokenStorageService);
  const currentUser = tokenService.getUser();
  console.log("User from tokenStorage in AuthGuard " + currentUser);
  if (currentUser) {
    console.log("User is logged in");
    return true;
  }
  console.log("User not logged in");
  router.navigate(['/login']);
  return false;
}

