import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
            <div className='whole-page'>
                <Sidebar />
                <div className='main-content'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/post" element={<PostPage />} />
                        <Route path="/update" element={<Update />} />
                    </Routes>
                </div>
            </div>
        </Router>
    </>
  )
}

export default App
