## Para utilizar as imagens da galeria em parents components, faça:

``` jsx 
  const ParentComponent = () => {
  // Estado para armazenar a imagem selecionada
  const [selectedImage, setSelectedImage] = useState(null);

  // Função para lidar com a seleção da imagem
  const handleSelectImage = (image) => {
    setSelectedImage(image); // Atualiza o estado com os dados da imagem selecionada
    console.log("Imagem selecionada:", image);
  };

  return (
    <div>
      <Gallery images={galleryImages} handleSelectImage={handleSelectImage} />
      {selectedImage && (
        <div>
          <h3>Imagem Selecionada:</h3>
          <img src={selectedImage.src} alt={selectedImage.caption} />
          <p>{selectedImage.description}</p>
        </div>
      )}
    </div>
  );
}
```

## Default Props para teste:

```jsx

Gallery.defaultProps = {
  images: [
    {
      id: 10,
      caption: 'Mateus Pinheiro',
      url: 'http://localhost:3001/uploads/fb06147b15866d237316-me.jpeg?width=1944&height=2592',
      credits: 'Mateus Pinheiro',
      description: 'Imagem de Perfil',
      created_at: '2024-05-02T00:05:09.815Z'
    },
    {
      id: 11,
      caption: 'Oleg Ivanov',
      url: 'http://localhost:3001/uploads/7e10a6362d0c8c86a0c8-premium_photo-1673792686302-7555a74de717.avif?width=2574&height=3861',
      credits: 'Oleg Ivanov',
      description: 'Imagem de Perfil',
      created_at: '2024-05-02T00:05:09.815Z'
    }
  ]
}
 
```