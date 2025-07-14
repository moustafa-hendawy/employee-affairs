
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch
export const fetchSubAdData = createAsyncThunk('subAdSlice/fetchGeneralData', async (generalAdId) => {
    const res = await fetch(`http://193.227.24.29:5000/api/SubAd/ByGeneralAd/${generalAdId}`);
    const data = await res.json(); 
    return data;
});

// export const fetchSubAdData = createAsyncThunk('subAdSlice/fetchGeneralData', async (generalAdId) => {
//     const res = await fetch(`http://193.227.24.29:5000/api/SubAd/ByGeneralAd/${generalAdId}`);
//     const data = await res.json(); 
//     return data;
// });

// Add
export const addSubAdData = createAsyncThunk('subAdSlice/addSubAdData', async (payload) => {
    const res = await fetch('http://193.227.24.29:5000/api/SubAd', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
});

// Edit
export const editSubAdData = createAsyncThunk('subAdSlice/editSubAdData', async (payload) => {
    const res = await fetch(`http://193.227.24.29:5000/api/SubAd?id=${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
});

// Delete
export const deleteSubAdData = createAsyncThunk('subAdSlice/deleteSubAdData', async (id) => {
    await fetch(`http://193.227.24.29:5000/api/SubAd/${id}`, {
        method: 'DELETE'
    });
    return id; // نرجع الـ id عشان نحذفه من الـ state
});

const subAdSlice = createSlice({
    name: 'subAdSlice',
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
            .addCase(fetchSubAdData.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addSubAdData.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(editSubAdData.fulfilled, (state, action) => {
                const index = state.findIndex(i => i.code === action.payload.code);
                if (index !== -1) {
                    state[index] = {...state[index], ...action.payload};
                }
            })
            .addCase(deleteSubAdData.fulfilled, (state, action) => {
                return state.filter((i) => i.id !== action.payload);
            });
    }
});

export default subAdSlice.reducer;
export const { setFaculty, updateFaculty,setSubAd } = subAdSlice.actions;
