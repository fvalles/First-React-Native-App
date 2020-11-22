import React from 'react'
import styled, { css } from 'styled-components'

export default function Button({ onPress, text, marginTop }) {
    return (
        <StyledTouchableOpacity onPress={onPress} marginTop={marginTop}>
          <StyledText>{text}</StyledText>
        </StyledTouchableOpacity>
    );
}

const StyledTouchableOpacity = styled.TouchableOpacity`
    background-color: #0000FF;
    padding: 20px;
    border-radius: 5px;

    ${props =>
        props.marginTop &&
        css`
            margin-top: 10px;
        `}
`

const StyledText = styled.Text`
    font-size: 20px;
    color: #FFF;
    font-weight: bold;
`
