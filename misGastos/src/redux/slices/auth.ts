// features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginRequest {
  identifier: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  // Agrega más campos según tu modelo de usuario
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

// Acción asincrónica para realizar el login
export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginRequest, { rejectWithValue }) => {
      console.log("loginData",loginData);
      try {
        const response = await axios.post<LoginResponse>('https://hokins-app.herokuapp.com/api/auth/local', loginData);
        // Guarda el token en localStorage o donde prefieras
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.log("error",error);
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue('An unknown error occurred1');
        }
      }
    }
  );
// Acción que busca el user en localStorage al cargar la app y lo asigna al estado
export const checkUser = createAsyncThunk(
  'auth/checkUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      } else {
        return rejectWithValue('No user found');
      }
    } catch (error) {
      return rejectWithValue('An unknown error occurred2');
    }
  });


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Limpia el token de localStorage o donde lo hayas guardado
      AsyncStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.isAuthenticated = true;
        console.log(state);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
      }).addCase(checkUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.isAuthenticated = true;
      }).addCase(checkUser.rejected, (state, action) => {
        state.isAuthenticated = false;  
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;