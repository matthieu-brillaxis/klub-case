import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from 'components/home/home'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
})

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swap" element={<div>swap</div>} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
