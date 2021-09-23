
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path fill-rule="nonzero" d="M18.901 10a2.999 2.999 0 0 0 4.075 1.113 3.5 3.5 0 0 1-1.975 3.55L21 21h-7v-2a2 2 0 0 0-1.85-1.995L12 17a2 2 0 0 0-1.995 1.85L10 19v2H3v-6.336a3.5 3.5 0 0 1-1.979-3.553A2.999 2.999 0 0 0 5.098 10h13.803zm-.971 2H6.069l-.076.079c-.431.42-.935.76-1.486 1.002l-.096.039.589.28-.001 5.6 3.002-.001v-.072l.01-.223c.149-2.016 1.78-3.599 3.854-3.698l.208-.005.223.01a4 4 0 0 1 3.699 3.787l.004.201L19 19l.001-5.6.587-.28-.095-.04a5.002 5.002 0 0 1-1.486-1.001L17.93 12zm-.894-9a3.5 3.5 0 0 0 4.446 2.86 3.5 3.5 0 0 1-3.29 3.135L18 9H6a3.5 3.5 0 0 1-3.482-3.14A3.5 3.5 0 0 0 6.964 3h10.072zM15.6 5H8.399a5.507 5.507 0 0 1-1.49 1.816L6.661 7h10.677l-.012-.008a5.518 5.518 0 0 1-1.579-1.722L15.6 5z"/>
    </g>
</svg>

            )
    }
    
