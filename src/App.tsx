import { lazy, Suspense } from 'react'
import Routes from './routes/Routes'
// const Routes = lazy(() => import('./routes/Routes'))

function App() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes />
    </Suspense>
  )
}

export default App
