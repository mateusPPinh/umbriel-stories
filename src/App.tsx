import Boxes from './components/Boxes/Boxes'
import { type ReactElement } from 'react'
import Text from './components/Typography'

const App = (): ReactElement => {
  return (
    <Boxes
      as="div"
      css={{
        bgColor: 'background4',
        width: '100%',
        height: '100vh'
      }}
    >
      <Text as='h2' css={{ color: 'blueDark' }}>Awesome</Text>
    </Boxes>
  )
}

export default App
