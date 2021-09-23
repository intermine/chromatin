
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M11 2.05V12h2V2.05c5.053.501 9 4.765 9 9.95 0 5.523-4.477 10-10 10S2 17.523 2 12c0-5.185 3.947-9.449 9-9.95z"/>
    </g>
</svg>

            )
    }
    
