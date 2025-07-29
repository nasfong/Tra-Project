import { Suspense } from 'react'
import Routes from './routes/Routes'

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes />
    </Suspense>
  )
}

export default App
