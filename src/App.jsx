import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'

// Lazy-loaded routes (code-split to keep initial bundle small)
const Docs = lazy(() => import('./pages/Docs').then((m) => ({ default: m.Docs })))
const Articles = lazy(() => import('./pages/Articles').then((m) => ({ default: m.Articles })))

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/docs"
          element={
            <Suspense fallback={null}>
              <Docs />
            </Suspense>
          }
        />
        <Route
          path="/docs/:slug"
          element={
            <Suspense fallback={null}>
              <Docs />
            </Suspense>
          }
        />
        <Route
          path="/articles"
          element={
            <Suspense fallback={null}>
              <Articles />
            </Suspense>
          }
        />
        <Route
          path="/articles/:slug"
          element={
            <Suspense fallback={null}>
              <Articles />
            </Suspense>
          }
        />
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
      <Footer />
    </BrowserRouter>
  )
}

export { App }
