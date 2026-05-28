import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Articles from './pages/Articles'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:slug" element={<Docs />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Articles />} />
        <Route
          path="*"
          element={
            <div style={{ padding: '80px 24px', textAlign: 'center' }}>
              <h2>Page not found</h2>
              <p>
                <a href="/">Go back home</a>
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
