import { FormEvent ,useEffect, useState } from 'react';
import { Area, Container, Header, PhotoList, ScreenWarning, UploadForm } from './styles';
import { deletePhoto, getAll, insertPhoto } from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await getAll());
    setLoading(false);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await insertPhoto(file);
      setUploading(false);

      if (result instanceof Error) {
        return alert(`${result.name} - ${result.message}`);
      }

       let newPhotoList = [...photos];
       newPhotoList.push(result);
       setPhotos(newPhotoList);
    }
  }

  const handleDeletePhoto = async (name: string) => {
    await deletePhoto(name);
    getPhotos();
  }
  
  return(
    <Container>
      <Area>
        <Header>
          Galeria de Fotos
        </Header>

        <UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading &&
            "Enviando..."
          }
        </UploadForm>

        {loading && 
          <ScreenWarning>
            <div>✋</div>
            <div>Carregando...</div>
          </ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <PhotoList>
            {photos.map((item, index) => (
              <PhotoItem 
                key={index}
                name={item.name}
                onDelete={handleDeletePhoto}
                url={item.url} 
              />
            ))}
          </PhotoList>
        }

        {!loading && photos.length === 0 &&
          <ScreenWarning>
            <div>😞</div>
            <div>Não há fotos cadastradas.</div>
          </ScreenWarning>
        }
      </Area>
    </Container>
  );
}

export default App;