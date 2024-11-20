import styled from 'styled-components';

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-sm);
  padding: 1rem;

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;

export default ButtonText;
