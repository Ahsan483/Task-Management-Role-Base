import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {  initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => {
    localStorage.setItem('token', token); // store JWT
    return {
      ...state,
      user,
      token,
      loading: false,
      isLoggedIn: true,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLoggedIn: false,
  })),
  on(AuthActions.logout, state => {
    localStorage.removeItem('token'); // remove JWT on logout
    return {
      ...state,
      user: null,
      token: null,
      isLoggedIn: false,
      loading: false,
      error: null,
    };
  }),
  // Register actions
  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { user, token }) => {
    localStorage.setItem('token', token);
    return {
      ...state,
      user,
      token,
      loading: false,
      isLoggedIn: true,
      error: null,
    };
  }),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isLoggedIn: false,
  }))
);
