
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M21 10H11v7.382c0 1.563.777 3.023 2.074 3.892l1.083.726H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.447 2 3.998 2h11.999L21 7v3zm-8 2h8v5.382c0 .897-.446 1.734-1.187 2.23L17 21.499l-2.813-1.885A2.685 2.685 0 0 1 13 17.383V12z"/>
    </g>
</svg>

            )
    }
    
