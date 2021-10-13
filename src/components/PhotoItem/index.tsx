import { Container } from './styles';

type Props = {
    name: string;
    url: string;
    onDelete: (name: string) => void;
}

export const PhotoItem = ({name, url, onDelete} : Props) => {
    return(
        <Container>
            <img src={url} alt={name} />
            <p>{name}</p>
            <button onClick={() => onDelete(name)}>Excluir</button>
        </Container>
    );
}