import { Boxes } from '@umbriel/components'
import { type ReactElement } from 'react'
import Text from './components/Typography'

const App = (): ReactElement => {
  return (
    <Boxes
      as="div"
      css={{
        bgColor: 'black',
        width: '100%',
        height: '100vh'
      }}
    >
      <Text as='h2' css={{ color: 'white' }}>Awesome</Text>
    </Boxes>
  )
}

export default App
