import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const PlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
`;

export const PositionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  font-size: 2rem;
  font-weight: 700;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 50%;
  background-color: hsl(${props => props.random}, 100%, 75%);
  color: hsl(${props => props.random}, 100%, 15%);
  border: 3px solid hsl(${props => props.random}, 100%, 15%);

`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
