import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from 'components/home/home'
import React from 'react'
import Swap from 'components/swap/swap'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 6000
    }
  }
})

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/swap" element={<Swap />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
