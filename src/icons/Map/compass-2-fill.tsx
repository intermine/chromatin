
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M18.328 4.258L10.586 12 12 13.414l7.742-7.742A9.957 9.957 0 0 1 22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2c2.4 0 4.604.847 6.328 2.258z"/>
    </g>
</svg>

            )
    }
    
