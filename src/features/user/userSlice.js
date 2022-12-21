import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
  status: false,
  id: null,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
    console.log(response)
  return response;
});


export const updateUsers = createAsyncThunk(
  "user/updateUsers",
  async (data) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);

export const addUsers = createAsyncThunk("user/addUsers", async (data) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
    console.log(data)
  return response;
});

export const deleteUsers = createAsyncThunk(
  "user/deleteUsers",
  async (data) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${data.id}`,
      {
        method: "Delete",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);
export const userSlice = createSlice({
  name: "resource",
  initialState,
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = false;
        state.value = action.payload;
      })
      .addCase(updateUsers.pending, (state) => {
        state.status = true;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.status = false;
        const objIndex =
          state.value &&
          state.value.findIndex((obj) => obj.id == action.payload.id);
        state.value[objIndex] = action.payload;
      })
      .addCase(addUsers.pending, (state) => {
        state.status = true;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.status = false;
        state.value = [...state.value, action.payload];
      })
      .addCase(deleteUsers.pending, (state) => {
        state.status = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.status = false;
        const objIndex =
          state.value &&
          state.value.findIndex((obj) => obj.id == action.meta.arg.id);
        state.value.splice(objIndex, 1);
      });
  },
});

export const userList = (state) => state.resource.value;

export default userSlice.reducer;
