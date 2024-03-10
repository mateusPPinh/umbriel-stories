import { Boxes } from '@umbriel/components'
import { type ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <Boxes
      as="div"
      css={{
        bgColor: 'black',
        width: '100%',
        height: '100vh',
      }}
    >
      <h1>Awesome</h1>
    </Boxes>
  )
}

export default App
