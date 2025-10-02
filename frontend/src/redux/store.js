import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import authSlice from './authSlice'

// Persist config
const persistConfig = {
  key: 'auth',
  storage,
}

// Create persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice)

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export const persistor = persistStore(store)
export default store