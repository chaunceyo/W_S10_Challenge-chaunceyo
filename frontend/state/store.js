import { configureStore } from '@reduxjs/toolkit'
import { orderApi } from './orderApi'
import filterReducer from './filterSlice'


export const store = configureStore({
  reducer: {
    filters: filterReducer,
    [orderApi.reducerPath] : orderApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    orderApi.middleware,
  ),
})


