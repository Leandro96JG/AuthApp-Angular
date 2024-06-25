import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/authServices.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp';

  //

  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  // el effect sirve para saber cuando una señal cambia
  public authStatusChangedEffect = effect(()=>{
      switch(this.authService.authStatus())
      {
        case AuthStatus.checking:
          return;
        case AuthStatus.authenticated:
          this.router.navigateByUrl('/deashboard');
          return;
        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/auth/login');
          return;
      }
  })

}
