
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0H24V24H0z"/>
        <path d="M12 3c4.284 0 8.22 1.497 11.31 3.996L12 21 .69 6.997C3.78 4.497 7.714 3 12 3zm0 9c-1.42 0-2.764.33-3.959.915L12 17.817l3.958-4.902C14.764 12.329 13.42 12 12 12zm0-7c-3.028 0-5.923.842-8.42 2.392l3.178 3.935C8.316 10.481 10.102 10 12 10c1.898 0 3.683.48 5.241 1.327L20.42 7.39C17.922 5.841 15.027 5 12 5z"/>
    </g>
</svg>

            )
    }
    
