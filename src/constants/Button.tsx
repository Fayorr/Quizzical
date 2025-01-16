import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color:#293264;;
    color: #F5F7FB;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
/* box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color]; */
    &:hover {
        background-color: darkviolet;
        box-shadow: 0 4 4px 25% #000;        
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