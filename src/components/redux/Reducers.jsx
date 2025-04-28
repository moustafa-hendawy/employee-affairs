import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Fetch
export const fetchFacultyData = createAsyncThunk('facultySlice/fetchFacultyData', async () => {
    const res = await fetch('http://193.227.24.29:5000/api/Faculty');
    const data = await res.json(); 
    return data;
 })
// Edit
export const editFacultyData = createAsyncThunk('facultySlice/editFacultyData', async ({ id, updateFaculty }) => {
    const res = await fetch(`http://193.227.24.29:5000/api/Faculty/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateFaculty),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
});
//delete
export const deleteFacultyData = createAsyncThunk('facultySlice/deleteFacultyData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/Faculty/${id}`, {
      method: 'DELETE'
    });
    return id             // نرجع الـ id عشان نحذفه من الـ state
  });



 const facultySlice = createSlice({
    name: 'facultySlice',
    initialState: [],
    reducers: {
        setFaculty: (state, action) => action.payload,

        updateFaculty : (state, action) => {
            const {id, name, code} = action.payload;
            const uf = state.find((i) => i.id == id);
            if (uf) {
               uf.id = id,
               uf.name = name,
               uf.code = code
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFacultyData.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(editFacultyData.fulfilled, (state, action) => {
            const index = state.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        })
         .addCase(deleteFacultyData.fulfilled, (state, action) => {
            return state.filter((i) => i.id !== action.payload );
            if (index !== -1) {
                state[index] = action.payload;
            }
        })
    }
})
export default facultySlice.reducer
export const {setFaculty, updateFaculty} = facultySlice.actions;