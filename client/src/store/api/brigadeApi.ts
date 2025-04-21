import { baseApi } from "./baseApi";

export const brigadeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBrigade: builder.mutation({
            query: (team) => ({
                url: '/brigade/create',
                method: 'POST',
                body: team
            }),
            invalidatesTags: ['Brigade']
        }),
        getAllBrigades: builder.query({
            query: () => ({
                url: '/brigade',
                method: 'GET'
            }),
            providesTags: ['Brigade']
        })
    })
})

export const { 
    useCreateBrigadeMutation,
    useGetAllBrigadesQuery
} = brigadeApi