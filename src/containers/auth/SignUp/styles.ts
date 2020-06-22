import styled from "styled-components";

interface Props {
  primary?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  width: 350px;
  height: 40px;
  border: none;
  background: #ecf0f1;
  border-radius: 3px;
  margin: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  width: 360px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background: ${(p: Props) => (p.primary ? "palevioletred" : "#9b59b6")};
  color: #fff;
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
`;

export const Title = styled.p`
  font-weight: bold;
  color: #9b59b6;
  font-size: 22px;
`;

export const Error = styled.p`
  color: red;
  font-size: 12px;
`;
