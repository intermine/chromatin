
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M20 22H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2v-2H6a1 1 0 0 0 0 2h13zm-7-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-3 4h6a3 3 0 0 0-6 0z"/>
    </g>
</svg>

            )
    }
    
