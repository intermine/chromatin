
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M16 1.5V16h3v2h-3v4h-2v-4H4v-1.102L14 1.5h2zM14 16V5.171L6.968 16H14z"/>
    </g>
</svg>

            )
    }
    
