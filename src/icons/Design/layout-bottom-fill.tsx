import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M22 16v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4h20zM21 3a1 1 0 0 1 1 1v10H2V4a1 1 0 0 1 1-1h18z"/>
    </g>
</svg>
</IconContainer>
