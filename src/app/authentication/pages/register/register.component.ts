import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent {
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  miFormulario: FormGroup = this.fb.group({
    name: ['Test 4', [Validators.required]],
    email: [
      'test4@test.com',
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  registro() {
    const { name, email, password } = this.miFormulario.value;

    this.authService.registro(name, email, password).subscribe((ok) => {
      if (ok === true) {
        this.router.navigateByUrl('/authentication');
      } else {
        Swal.fire('Error', ok, 'error');
      }
    });
  }
}
