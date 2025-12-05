/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { AuthState } from '../../store/auth/auth.state';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize forms
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      organizationId: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Subscribe to loading and error states
    this.store.select(state => state.auth.loading).subscribe(l => this.loading = l);
    this.store.select(state => state.auth.error).subscribe(e => this.error = e);

    // Redirect to dashboard on successful login
    this.store
      .select(state => state.auth.user)
      .pipe(filter(user => !!user)) // Only when user is defined
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });

    // Ensure token saved to localStorage via AuthService when available
    this.store
      .select(state => state.auth.token)
      .pipe(filter(token => !!token))
      .subscribe((token: string | null) => {
        if (token) {
          this.authService.setToken(token);
        }
      });
  }

  // Toggle between login and register forms
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null; // clear errors when switching
  }

  // Dispatch login action
  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }

  
  

  // Dispatch register action
  register() {
    if (this.registerForm.valid) {
      const { email, password, name, organizationId } = this.registerForm.value;
      this.store.dispatch(AuthActions.register({ email, password, name, organizationId }));
    }
  }
}
