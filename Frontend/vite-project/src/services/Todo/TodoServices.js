import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../../constant";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const token = userData?.tokenData;

      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["readTodo"],

  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (body) => {
        return {
          url: "/todos/create",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["readTodo"],
    }),

    readTodo: builder.query({
      query: (id) => {
        return {
          url: `/todos/readAll/${id}`,
          method: "GET",
        };
      },
      providesTags: ["readTodo"],
    }),

    updateTodo: builder.mutation({
      query: (info) => {
        return {
          url: `/todos/update/${info.id}`,
          method: "PATCH",
          body: info.body,
        };
      },
      invalidatesTags: ["readTodo"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/todos/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["readTodo"],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useReadTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
