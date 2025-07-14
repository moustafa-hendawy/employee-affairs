import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Fetch
export const fetchDegreeData = createAsyncThunk('jobDegreeSlice/fetchDegreeData', async () => {
    const res = await fetch('http://193.227.24.29:5000/api/FincialDegrees');
    const data = await res.json(); 
    return data;
 })
// export const fetchDegreeTypeData = createAsyncThunk('jobDegreeSlice/fetchDegreeTypeData', async () => {
//     const res = await fetch('http://193.227.24.29:5000/api/FincialDegreeType');
//     const data = await res.json(); 
//     return data;
//  })

// Add
export const addDegreeData = createAsyncThunk('jobDegreeSlice/addDegreeData', async({id, name, code,fincialDegreeTypeId}) => {
    const res = await fetch('http://193.227.24.29:5000/api/FincialDegrees', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({id, name, code, fincialDegreeTypeId})
    });
    const data = await res.json();
    return data;
})
// Edit
export const editDegreeData = createAsyncThunk('jobDegreeSlice/editDegreeData', async ({ id, name, code,fincialDegreeTypeId }) => {
    const res = await fetch(`http://193.227.24.29:5000/api/FincialDegrees/${id}`, {
        method: 'PUT',
        body: JSON.stringify({id, name, code, fincialDegreeTypeId}),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
});
//delete
export const deleteDegreeData = createAsyncThunk('jobDegreeSlice/deleteDegreeData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/FincialDegrees/${id}`, {
      method: 'DELETE'
    });
    return id             // نرجع الـ id عشان نحذفه من الـ state
  });



 const jobDegreeSlice = createSlice({
    name: 'jobDegreeSlice',
    initialState: [],
    reducers: {
        setFaculty: (state, action) => action.payload,

        updateFaculty : (state, action) => {
            const {id, name, code, fincialDegreeTypeId} = action.payload;
            const uf = state.find((i) => i.id == id);
            if (uf) {
               uf.id = id,
               uf.name = name,
               uf.code = code,
               uf.fincialDegreeTypeId = fincialDegreeTypeId
            }
        },
        add: (state, action) => state.push(action.payload)
     },
    extraReducers: (builder) => {
        builder.addCase(fetchDegreeData.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(editDegreeData.fulfilled, (state, action) => {
            const index = state.findIndex(i => i.code === action.payload.code);
            if (index !== -1) {
                state[index] = action.payload;
            }
        })
         .addCase(deleteDegreeData.fulfilled, (state, action) => {
            return state.filter((i) => i.id !== action.payload );
            if (index !== -1) {
                state[index] = action.payload;
            }
        }) 
        .addCase(addDegreeData.fulfilled, (state, action) => {
             state.push(action.payload);
           
        })
    }
})
export default jobDegreeSlice.reducer
export const {setFaculty, updateFaculty} = jobDegreeSlice.actions;