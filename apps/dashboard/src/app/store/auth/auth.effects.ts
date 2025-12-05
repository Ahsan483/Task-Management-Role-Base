/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from 'libs/data/interfaces';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response: AuthResponse) =>
            AuthActions.loginSuccess({ user: response.user, token: response.access_token })
          ),
          catchError(err =>
            of(
              AuthActions.loginFailure({
                error: err?.error?.message ?? 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password, name, organizationId }) =>
        this.authService.register(email, password, name, organizationId).pipe(
          map((response: AuthResponse) =>
            AuthActions.registerSuccess({ user: response.user, token: response.access_token })
          ),
          catchError(err =>
            of(
              AuthActions.registerFailure({
                error: err?.error?.message ?? 'Registration failed',
              })
            )
          )
        )
      )
    )
  );
}
