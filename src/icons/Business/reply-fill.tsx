import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0H24V24H0z"/>
        <path d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z"/>
    </g>
</svg>
</IconContainer>
