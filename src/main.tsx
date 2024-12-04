import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { SidebarProvider } from './context/SidebarContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SidebarProvider>

        <RouterProvider router={router} />
      </SidebarProvider>
    </Provider>
  </StrictMode>,
)
