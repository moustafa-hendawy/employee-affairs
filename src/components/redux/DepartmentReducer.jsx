
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch
export const fetchDepartmentData = createAsyncThunk('departmentSlice/fetchDepartmentData', async (generalAdId) => {
    const res = await fetch(`http://193.227.24.29:5000/api/Department/BySubAd/${subAdId}`);
    const data = await res.json(); 
    return data;
});


// Add
export const addDepartmentData = createAsyncThunk('departmentSlice/addDepartmentData', async (payload) => {
    const res = await fetch('http://193.227.24.29:5000/api/SubAd', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
});

// Edit
export const editDepartmentData = createAsyncThunk('departmentSlice/editDepartmentData', async (payload) => {
    const res = await fetch(`http://193.227.24.29:5000/api/SubAd?id=${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
});

// Delete
export const deleteDepartmentData = createAsyncThunk('departmentSlice/deleteDepartmentData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/SubAd/${id}`, {
        method: 'DELETE'
    });
    return id; // نرجع الـ id عشان نحذفه من الـ state
});

const departmentSlice = createSlice({
    name: 'departmentSlice',
    initialState: [],
    reducers: {
        setFaculty: (state, action) => action.payload,
        setSubAd: (state, action) => action.payload,

        updateFaculty: (state, action) => {
            const { id, name, code, level, specialLevel, status } = action.payload;
            const uf = state.find((i) => i.id === id);
            if (uf) {
                uf.name = name;
                uf.code = code;
                uf.level = level;
                uf.specialLevel = specialLevel;
                uf.status = status;
            }
        },

        add: (state, action) => {
            state.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentData.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addDepartmentData.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(editDepartmentData.fulfilled, (state, action) => {
                const index = state.findIndex(i => i.code === action.payload.code);
                if (index !== -1) {
                    state[index] = {...state[index], ...action.payload};
                }
            })
            .addCase(deleteDepartmentData.fulfilled, (state, action) => {
                return state.filter((i) => i.id !== action.payload);
            });
    }
});

export default departmentSlice.reducer;
export const { setFaculty, updateFaculty,setSubAd } = departmentSlice.actions;
