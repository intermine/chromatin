import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z"/>
    </g>
</svg>
</IconContainer>