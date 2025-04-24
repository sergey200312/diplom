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
            query: (params) => ({
                url: '/brigade',
                method: 'GET',
                params
            }),
            providesTags: ['Brigade']
        }),
        deleteBrigade: builder.mutation({
            query: (id) => ({
                url: `/brigade/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Brigade']
        })
    })
})

export const { 
    useCreateBrigadeMutation,
    useGetAllBrigadesQuery,
    useDeleteBrigadeMutation
} = brigadeApi