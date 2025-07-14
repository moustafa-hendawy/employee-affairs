import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch
export const fetchGeneralData = createAsyncThunk('generalSlice/fetchGeneralData', async (sectorId) => {
    const res = await fetch(`http://193.227.24.29:5000/api/GeneralAd/BySector/${sectorId}`);
    const data = await res.json(); 
    return data;
 })

// Add
export const addGeneralData = createAsyncThunk('generalSlice/addGeneralData', async({ id, name, code, level, specialLevel}) => {
    const res = await fetch('http://193.227.24.29:5000/api/GeneralAd', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({id, name, code, level, specialLevel})
    });
    const data = await res.json();
    return data;
})
// Edit
export const editGeneralData = createAsyncThunk('generalSlice/editGeneralData', async ({ id, updateFaculty }) => {
    const res = await fetch(`http://193.227.24.29:5000/api/GeneralAd/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateFaculty),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
});
//delete
export const deleteGeneralData = createAsyncThunk('generalSlice/deleteGeneralData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/GeneralAd/${id}`, {
      method: 'DELETE'
    });
    return id             // نرجع الـ id عشان نحذفه من الـ state
  });

 const generalSlice = createSlice({
    name: 'generalSlice',
    initialState: [],
    reducers: {
        setFaculty: (state, action) => action.payload,

        updateFaculty : (state, action) => {
            const {id, name, code, level, specialLevel} = action.payload;
            const uf = state.find((i) => i.id == id);
            if (uf) {
               uf.id = id,
               uf.name = name,
               uf.code = code,
               uf.level = level,
               uf.specialLevel = specialLevel
            }
        },
        add: (state, action) => state.push(action.payload)
     },
    extraReducers: (builder) => {
        builder.addCase(fetchGeneralData.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(editGeneralData.fulfilled, (state, action) => {
            const index = state.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        })
         .addCase(deleteGeneralData.fulfilled, (state, action) => {
            return state.filter((i) => i.id !== action.payload );
            if (index !== -1) {
                state[index] = action.payload;
            }
        }) 
        .addCase(addGeneralData.fulfilled, (state, action) => {
             state.push(action.payload);
           
        })
    }
})
export default generalSlice.reducer
export const {setFaculty, updateFaculty} = facultySlice.actions;