import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { TuiTest } from './pages/TuiTest'

// Lazy-loaded routes (code-split to keep initial bundle small)
const Docs = lazy(() => import('./pages/Docs').then((m) => ({ default: m.Docs })))
const Articles = lazy(() => import('./pages/Articles').then((m) => ({ default: m.Articles })))

function AppContent() {
  const location = useLocation()
  const hideChrome = location.pathname === '/tui-test'

  return (
    <>
      {!hideChrome && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tui-test" element={<TuiTest />} />
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
      {!hideChrome && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export { App }
