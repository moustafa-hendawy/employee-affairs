import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Fetch
export const fetchSectorData = createAsyncThunk('sectorSlice/fetchSectorData', async () => {
    const res = await fetch('http://193.227.24.29:5000/api/Sector');
    const data = await res.json(); 
    return data;
 })

// Add
export const addSectorData = createAsyncThunk('sectorSlice/addSectorData', async({ name, code,status}) => {
    const res = await fetch('http://193.227.24.29:5000/api/Sector', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({ name, code,status})
    });
    const data = await res.json();
    return data;
})
// Edit
export const editSectorData = createAsyncThunk('sectorSlice/editSectorData', async ({ id, updateFaculty }) => {
    const res = await fetch(`http://193.227.24.29:5000/api/Sector/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateFaculty),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
});
//delete
export const deleteSectorData = createAsyncThunk('sectorSlice/deleteSectorData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/Sector/${id}`, {
      method: 'DELETE'
    });
    return id             // نرجع الـ id عشان نحذفه من الـ state
  });



 const sectorSlice = createSlice({
    name: 'sectorSlice',
    initialState: [],
    reducers: {
        setFaculty: (state, action) => action.payload,

        updateFaculty : (state, action) => {
            const {id, name, code,status} = action.payload;
            const uf = state.find((i) => i.id == id);
            if (uf) {
               uf.id = id,
               uf.name = name,
               uf.code = code,
               uf.status = status
            }
        },
        add: (state, action) => state.push(action.payload)
     },
    extraReducers: (builder) => {
        builder.addCase(fetchSectorData.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(editSectorData.fulfilled, (state, action) => {
            const index = state.findIndex(i => i.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        })
         .addCase(deleteSectorData.fulfilled, (state, action) => {
            return state.filter((i) => i.id !== action.payload );
            if (index !== -1) {
                state[index] = action.payload;
            }
        }) 
        .addCase(addSectorData.fulfilled, (state, action) => {
             state.push(action.payload);
           
        })
    }
})
export default sectorSlice.reducer
export const {setFaculty, updateFaculty} = sectorSlice.actions;