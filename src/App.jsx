import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Reports from './pages/Reports'


function App() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <Routes>
        <Route path="/reports" element={<Reports />} />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="rounded-xl shadow-soft"
        bodyClassName="text-sm font-medium"
        progressClassName="bg-primary"
      />
    </div>
  )
}

export default App