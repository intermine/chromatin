import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M4.5 10a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM22 10h-2a4 4 0 1 0-8 0v5a4 4 0 1 0 8 0h2a6 6 0 1 1-12 0v-5a6 6 0 1 1 12 0z"/>
    </g>
</svg>
</IconContainer>
