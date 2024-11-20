

import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    profileData:null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setProfileData(state, value) {
                        state.profileData = value.payload;
                      },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser,setProfileData, setLoading} = profileSlice.actions;
export default profileSlice.reducer;


