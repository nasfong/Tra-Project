import { Suspense, useEffect } from 'react'
import Routes from './routes/Routes'
import { useAuthStore } from './store/useStore'

function App() {
  const { refreshAccessToken } = useAuthStore()
  useEffect(() => {
    refreshAccessToken()
  }, [refreshAccessToken])
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes />
    </Suspense>
  )
}

export default App
