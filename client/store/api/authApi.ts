
import { ILoginUser } from "../../src/types/auth";    
import { baseApi } from "./baseApi";



export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData: ILoginUser) => ({
                url: 'auth/login',
                method: 'POST',
                body: userData
            })
        })
    })
})

export const {
    useLoginMutation
} = authApi