import { ButtonContainer } from './Button.styles'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'sucess' | 'neutral'
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={color}>Enviar</ButtonContainer>
}
