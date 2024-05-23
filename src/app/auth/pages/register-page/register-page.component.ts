import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authServices.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    public myForm:FormGroup = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      name: ['',[Validators.required, Validators.minLength(6)]],
      password:['',[Validators.required, Validators.minLength(6)]],
    })

    register(){
      const {email,password} = this.myForm.value;
      this.authService.login(email,password)
      .subscribe(success =>
        console.log({success})
      );
    }
}
