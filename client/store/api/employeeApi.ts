
import { baseApi } from "./baseApi";



export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployee: builder.query({
            query: (params) => ({
                url: '/employee',
                method: 'GET',
                params
            }),
            providesTags: ['Employee'],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),
        createEmployee: builder.mutation({
            query: (employee) => ({
                url: '/employee',
                method: 'POST',
                body: employee
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployee: builder.mutation({
            query: ({ id, ...employee }) => ({
                url: `/employee/${id}`,
                method: 'PUT',
                body: employee
            }),
            invalidatesTags: ['Employee'],
        }), 
    })
})

export const {
    useGetAllEmployeeQuery,
    useDeleteEmployeeMutation,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation
} = employeeApi