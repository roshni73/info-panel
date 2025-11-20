import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 5,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    const data: User[] = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      const query = action.payload.toLowerCase();
      state.filteredUsers = query
        ? state.users.filter(
            (user) =>
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query) ||
              user.company.name.toLowerCase().includes(query) ||
              user.address.city.toLowerCase().includes(query)
          )
        : state.users;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setCurrentPage, setItemsPerPage } = usersSlice.actions;
export default usersSlice.reducer;
