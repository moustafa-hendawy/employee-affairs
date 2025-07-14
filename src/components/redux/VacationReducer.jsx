import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Fetch
export const fetchVacationTypeData = createAsyncThunk('vacationTypeSlice/fetchVacationTypeData', async () => {
    const res = await fetch('http://193.227.24.29:5000/api/VacationType');
    const data = await res.json(); 
    return data;
 })

// Add
export const addVacationTypeData = createAsyncThunk('vacationTypeSlice/addVacationTypeData', async({id, name, code}) => {
    const res = await fetch('http://193.227.24.29:5000/api/VacationType', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({id, name, code})
    });
    const data = await res.json();
    return data;
})
// Edit
export const editVacationTypeData = createAsyncThunk('vacationTypeSlice/editVacationTypeData', async ({ id, updateFaculty }) => {
    const res = await fetch(`http://193.227.24.29:5000/api/VacationType/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateFaculty),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data;
});
//delete
export const deleteVacationTypeData = createAsyncThunk('vacationTypeSlice/deleteVacationTypeData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/VacationType/${id}`, {
      method: 'DELETE'
    });
    return id             // نرجع الـ id عشان نحذفه من الـ state
  });



 const vacationTypeSlice = createSlice({
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
        },
        add: (state, action) => state.push(action.payload)
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
        .addCase(addFacultyData.fulfilled, (state, action) => {
             state.push(action.payload);
           
        })
    }
})
export default vacationTypeSlice.reducer
export const {setFaculty, updateFaculty} = vacationTypeSlice.actions;