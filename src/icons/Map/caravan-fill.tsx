
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0L24 0 24 24 0 24z"/>
        <path d="M14.172 3c.53 0 1.039.21 1.414.586l4.828 4.828c.375.375.586.884.586 1.414V17h2v2h-8.126c-.445 1.726-2.01 3-3.874 3-1.864 0-3.43-1.274-3.874-3H3c-.552 0-1-.448-1-1V5c0-1.105.895-2 2-2h10.172zM11 16c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm3-9H6v6h8V7zm-2 2v2H8V9h4z"/>
    </g>
</svg>

            )
    }
    
