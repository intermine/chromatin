
    export default (props: React.SVGProps<SVGSVGElement> & { innerRef?: React.RefObject<any>}): JSX.Element => {
        const { innerRef, ...rest } = props
        return (
            <svg ref={innerRef} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M11.751 21.997c-5.221-.128-9.45-4.257-9.736-9.438l-.012-.313 9.748 9.751zM12 2a9.988 9.988 0 0 1 8.193 4.265l-1.638 1.148A8.003 8.003 0 0 0 4.534 9.12L14.88 19.466A8.018 8.018 0 0 0 19.748 14H15.5v-2H22c0 4.726-3.279 8.686-7.685 9.73L2.269 9.686C3.314 5.28 7.274 2 12 2z"/>
    </g>
</svg>

            )
    }
    
