import { createSlice } from "@reduxjs/toolkit";


interface AuthState {

    token: string | null;

    userEmail: string | null;

}


const initialState: AuthState = {

    token: localStorage.getItem("accessToken"),

    userEmail: null

};



const authSlice = createSlice({

    name:"auth",

    initialState,

    reducers:{


        loginSuccess:(state, action)=>{


            state.token =
                action.payload.accessToken;


            localStorage.setItem(
                "accessToken",
                action.payload.accessToken
            );


            localStorage.setItem(
                "refreshToken",
                action.payload.refreshToken
            );


        },


        logout:(state)=>{


            state.token = null;


            localStorage.removeItem(
                "accessToken"
            );


            localStorage.removeItem(
                "refreshToken"
            );


        }


    }

});


export const {
    loginSuccess,
    logout

}=authSlice.actions;


export default authSlice.reducer;