import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const Modal = styled.View`
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Players = styled.View`
  flex: 1;
  width: 100%;
`;

export const AddButton = styled.TouchableOpacity`
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 8px 24px;
  background-color: #2196f3;
  border-radius: 8px;
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
