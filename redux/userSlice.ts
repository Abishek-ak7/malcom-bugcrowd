import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ✅ Extended User interface with all new profile fields
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;             // Profile image URL
  bio?: string;                // Short bio
  resume?: string;             // Resume file URL
  handle?: string;             // Unique bounty username / handle
  location?: string;           // City, Country
  website?: string;            // Personal or portfolio site
  twitter?: string;            // Twitter / X profile
  skills?: string;             // Comma-separated skills list
  preferred_targets?: string;  // Preferred bug targets
  total_bounties?: number;     // Total bounty count
  total_rewards?: number;      // Total rewards earned
  created_at?: string;    
  experience?:number;
  phone?:number     // From Supabase (optional)
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ✅ Load saved user from localStorage (for persistent login)
const savedUser =
  typeof window !== 'undefined' ? localStorage.getItem('user') : null;

const initialState: UserState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
};

// ✅ Redux slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 🔹 Login or signup start
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // 🔹 Successful login or signup
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      // Save user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },

    // 🔹 Login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // 🔹 Logout user and clear data
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },

    // 🔹 Update user data (partial update)
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        // Merge current user with new data
        state.currentUser = { ...state.currentUser, ...action.payload };

        // Save updated user in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.currentUser));
        }
      }
    },
  },
});

// ✅ Export actions
export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  userSlice.actions;

// ✅ Export reducer
export default userSlice.reducer;
