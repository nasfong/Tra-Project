import React, { createContext, useReducer } from 'react';

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
};

type AuthAction =
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

// Create the Context and Provider
type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
