import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<ButtonProps>`
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
      @media only screen and (max-width: 600px) {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
    
`;

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;