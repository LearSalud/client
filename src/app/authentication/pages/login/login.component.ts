import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  Formulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    console.log(this.Formulario.value);
    const { email, password } = this.Formulario.value;

    this.authService.login(email, password).subscribe((ok) => {
      console.log(ok);
      if (ok == true) {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }
}
