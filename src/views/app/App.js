import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import config from '../../utils/config'

import Main from '../main/Main'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Main />
        {config?.env?.hostname === 'localhost' && (
          <ReactQueryDevtools
            initialIsOpen={true}
            position='bottom-right'
          ></ReactQueryDevtools>
        )}
      </QueryClientProvider>
    </>
  )
}

export default App
