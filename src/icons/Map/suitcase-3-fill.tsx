import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0H24V24H0z"/>
        <path d="M15 1c.552 0 1 .448 1 1v5h1V6h2v1h1c.552 0 1 .448 1 1v12c0 .552-.448 1-1 1h-1v1h-2v-1H7v1H5v-1H4c-.552 0-1-.448-1-1V8c0-.552.448-1 1-1h1V6h2v1h1V2c0-.552.448-1 1-1h6zm-6 9H7v8h2v-8zm4 0h-2v8h2v-8zm4 0h-2v8h2v-8zm-3-7h-4v4h4V3z"/>
    </g>
</svg>
</IconContainer>
