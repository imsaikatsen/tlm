import 'App.css'
import SINGLE_HOME from 'APP_TLM/SINGLE_REQ/SINGLE_HOME'
import { Suspense } from 'react' // Deleted Fragment for removing warning 
import Error from 'Core/Error'
import { ErrorBoundary } from 'react-error-boundary'
import Spinner from './Core/Spinner'

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Spinner width={50} strokeWidht={1} />}>
        < SINGLE_HOME />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
