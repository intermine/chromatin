import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0H24V24H0z"/>
        <path d="M18 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H6c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h12zm-1 2H7v14h10V5zm-2 6v2h-2v-2h2z"/>
    </g>
</svg>
</IconContainer>
