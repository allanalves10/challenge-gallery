import styled from 'styled-components';

export const Container = styled.div`
    background-color: #3D3F43;
    border-radius: 10px;
    padding: 10px;

    img {
        width: 100%;
        height: 125px;
        display: block;
        margin-bottom: 10px;
        border-radius: 10px;
    }
    
    P {
        height: 50px;
    }

    button {
        background-color: #756DF4;
        min-width: 100%;
        border: 0;
        color: #FFF;
        padding: 8px 16px;
        font-size: 15px;
        border-radius: 10px;
        cursor: pointer;
        transition: filter 0.2s;
        bottom: 0;

        &:hover {
            filter: brightness(0.9)
        }
    }
`;