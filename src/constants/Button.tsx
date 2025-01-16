import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color:#293264;;
    color: #F5F7FB;
    border: none;
    border-radius: 15px;
    padding: 1rem 3.4rem;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    font-family: "Karla", sans-serif;
    &:hover {
        box-shadow: 0 4 14px 0 #000;        
    }
`;

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;