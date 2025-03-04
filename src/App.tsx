import React, { type ReactElement } from 'react'
import { BlockManagerDragDrop, CustomThemeProvider } from '@umbriel/components'

const mockArticles = [
  {
    id: '1',
    title: 'Artigo de Teste 1',
    subtitle: 'Subtítulo do artigo 1',
    image: 'https://via.placeholder.com/300',
    created_at: '2024-03-04T12:00:00Z',
    slug: 'artigo-teste-1',
    content: {
      description: 'Descrição do artigo 1',
      image: {
        desktop_image_path: 'https://via.placeholder.com/800',
        mobile_image_path: 'https://via.placeholder.com/400'
      }
    }
  },
  {
    id: '2',
    title: 'Artigo de Teste 2',
    subtitle: 'Subtítulo do artigo 2',
    image: 'https://via.placeholder.com/300',
    created_at: '2024-03-04T13:00:00Z',
    slug: 'artigo-teste-2',
    content: {
      description: 'Descrição do artigo 2',
      image: {
        desktop_image_path: 'https://via.placeholder.com/800',
        mobile_image_path: 'https://via.placeholder.com/400'
      }
    }
  }
]

const App = (): ReactElement => {
  const handleSave = (columns: { [key: string]: any[] }) => {
    console.log('Saved columns:', columns)
  }

  return (
    <CustomThemeProvider>
      <div className="max-w-[1200px] mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Teste do BlockManagerDragDrop</h1>
        <BlockManagerDragDrop
          articles={mockArticles}
          blockType="grid"
          onSave={handleSave}
          pageId="test-page"
          variant="standard"
        />
      </div>
    </CustomThemeProvider>
  )
}

export default App

// import React, { type ReactElement } from 'react'

// const App = (): ReactElement => {
//   return (
//     <div>
//       <h1>Hello World</h1>
//     </div>
//   )
// }

// export default App
