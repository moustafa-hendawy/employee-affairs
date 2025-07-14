import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Fetch
export const fetchDegreeTypeData = createAsyncThunk('fincialDegreeSlice/fetchDegreeTypeData', async () => {
    const res = await fetch('http://193.227.24.29:5000/api/FincialDegreeType');
    const data = await res.json(); 
    return data;
 })

// Add
export const addDegreeTypeData = createAsyncThunk('fincialDegreeSlice/addDegreeTypeeData', async({id, name, code}) => {
    const res = await fetch('http://193.227.24.29:5000/api/FincialDegreeType', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({id, name, code})
    });
    const data = await res.json();
    return data;
})
// Edit
export const editDegreeTypeData = createAsyncThunk('fincialDegreeSlice/editDegreeTypeData', async ({ id, updateFaculty }) => {
    const res = await fetch(`http://193.227.24.29:5000/api/FincialDegreeType/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateFaculty),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
});
//delete
export const deleteDegreeTypeData = createAsyncThunk('fincialDegreeSlice/deleteDegreeTypeData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/FincialDegreeType/${id}`, {
      method: 'DELETE'
    });
    return id             // نرجع الـ id عشان نحذفه من الـ state
  });



 const fincialDegreeSlice = createSlice({
    name: 'fincialDegreeSlice',
    initialState: [],
    reducers: {
        setFaculty: (state, action) => action.payload,

        updateFaculty : (state, action) => {
            const {id, name, code, fincialDegreeTypeId} = action.payload;
            const uf = state.find((i) => i.id == id);
            if (uf) {
               uf.id = id,
               uf.name = name,
               uf.code = code
            }
        },
        add: (state, action) => state.push(action.payload)
     },
    extraReducers: (builder) => {
        builder.addCase(fetchDegreeTypeData.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(editDegreeTypeData.fulfilled, (state, action) => {
            const index = state.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        })
         .addCase(deleteDegreeTypeData.fulfilled, (state, action) => {
            return state.filter((i) => i.id !== action.payload );
        }) 
        .addCase(addDegreeTypeData.fulfilled, (state, action) => {
             state.push(action.payload);
           
        })
    }
})
export default fincialDegreeSlice.reducer
export const {setFaculty, updateFaculty} = fincialDegreeSlice.actions;