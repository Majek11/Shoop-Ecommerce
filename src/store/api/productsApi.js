import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 20, category = '' } = {}) => {
        let url = 'products'
        
        if (category && category !== 'all') {
          url += `/category/${category}`
        }
        
        const params = new URLSearchParams()
        if (limit && !category) params.append('limit', limit)
        
        const queryString = params.toString()
        return queryString ? `${url}?${queryString}` : url
      },
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
      providesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi

