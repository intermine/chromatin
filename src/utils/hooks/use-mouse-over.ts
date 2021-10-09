/**
 * TODO: Add an option to trigger mouseEnter using keyboard event,
 * TODO: something like when anchor element is on focus then trigger
 * TODO: mouseEnter and mouseLeave when blur.
 */
import { useEffect, useState } from 'react'

import { getElementUsingEvent } from '../get'

type ReturnType = boolean | undefined
export type UseMouseOverOptions = {
    /**
     * Target element
     */
    anchorElement: HTMLElement | null
    /**
     * Additional Target Element
     */
    otherElement?: HTMLElement | null
    /**
     * Not listening to any event.
     *
     * @default false
     */
    isDisabled?: boolean
    /**
     * Triggered when hover starts
     */
    onHoverStart?: () => void
    /**
     * Triggered when hover ends
     */
    onHoverEnd?: () => void
    /**
     * @default false
     */
    isHoverPolygonVisible?: boolean
}

type Location =
    | 'unknown'
    | 'top-left'
    | 'top-right'
    | 'bottom-right'
    | 'bottom-left'

type HoverPolygonPointsType = {
    isValueSet: boolean
    points: Point[]
}

type Point = {
    x: number
    y: number
}

const isIntersecting = (p1: Point, p2: Point, p3: Point, p4: Point) => {
    const ccw = (q1: Point, q2: Point, q3: Point): boolean => {
        return (q3.y - q1.y) * (q2.x - q1.x) > (q2.y - q1.y) * (q3.x - q1.x)
    }

    return (
        ccw(p1, p3, p4) !== ccw(p2, p3, p4) &&
        ccw(p1, p2, p3) !== ccw(p1, p2, p4)
    )
}

const isPointInsidePolygon = (
    polygonPoints: Point[],
    point: [Point, Point]
): boolean => {
    let intersectCount = 0

    for (let i = 0; i < polygonPoints.length; i += 1) {
        const next = (i + 1) % polygonPoints.length
        if (
            isIntersecting(
                polygonPoints[i],
                polygonPoints[next],
                point[0],
                point[1]
            )
        ) {
            intersectCount += 1
        }
    }

    return intersectCount % 2 !== 0
}

const getElementLocation = (
    target?: HTMLElement | null,
    reference?: HTMLElement | null
): Location => {
    if (!reference || !target) return 'unknown'

    const {
        left: l1,
        top: t1,
        bottom: b1,
        right: r1,
        height: h1,
        width: w1,
    } = target.getBoundingClientRect()

    const {
        left: l2,
        top: t2,
        bottom: b2,
        right: r2,
        height: h2,
        width: w2,
    } = reference.getBoundingClientRect()

    const x1 = l1 !== 0 ? l1 : r1 - w1
    const x2 = l2 !== 0 ? l2 : r2 - w2

    const y1 = t1 !== 0 ? t1 : b1 - h1
    const y2 = t2 !== 0 ? t2 : b2 - h2

    const h = x1 + w1 / 2 > x2 ? 'left' : 'right'
    const v = y1 + h1 / 2 > y2 ? 'top' : 'bottom'

    return `${v}-${h}`
}

/**
 * To create hover svg using the points.
 */
const createHoverSVG = () => {
    const SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const polygon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'polygon'
    )

    SVG.setAttribute(
        'style',
        // eslint-disable-next-line max-len
        `fill: rgba(0, 0, 0, 0.2); position: fixed; top: 0; left: 0; height: 100vh; width: 100vw; z-index: -1`
    )

    SVG.append(polygon)

    return {
        remove: () => {
            SVG.remove()
        },
        append: (points: Point[]) => {
            polygon.setAttribute(
                'points',
                // eslint-disable-next-line max-len
                `${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`
            )
            document.body.append(SVG)
        },
    }
}

const hoverPolygonDefaultPoints = {
    isValueSet: false,
    points: [],
}

const svg = createHoverSVG()

export const useMouseOver = (options: UseMouseOverOptions): ReturnType => {
    const {
        anchorElement,
        otherElement,
        isDisabled = false,
        onHoverEnd,
        onHoverStart,
        isHoverPolygonVisible = false,
    } = options

    const [isMouseOver, setIsMouseOver] = useState<ReturnType>()
    const [
        hoverPolygonPoints,
        setHoverPolygonPoints,
    ] = useState<HoverPolygonPointsType>(hoverPolygonDefaultPoints)

    const followCursor = (event: MouseEvent) => {
        if (!anchorElement) {
            setHoverPolygonPoints(hoverPolygonDefaultPoints)
            setIsMouseOver(false)
            return
        }

        const target = getElementUsingEvent(event) as Node

        if (anchorElement.contains(target)) {
            setIsMouseOver(true)
            return
        }

        if (!otherElement) {
            setHoverPolygonPoints(hoverPolygonDefaultPoints)
            setIsMouseOver(false)
            return
        }

        if (otherElement.contains(target)) {
            setIsMouseOver(true)
            return
        }

        if (
            isPointInsidePolygon(hoverPolygonPoints.points, [
                {
                    x: event.clientX,
                    y: event.clientY,
                },
                { x: window.innerWidth, y: event.clientY },
            ])
        ) {
            setIsMouseOver(true)
            return
        }

        setIsMouseOver(false)
    }

    const onMouseEnter = () => {
        setIsMouseOver(true)
    }

    const onMouseLeave = () => {
        setIsMouseOver(false)
    }

    const updateHoverPolygonPoints = () => {
        if (!otherElement || !anchorElement) {
            setHoverPolygonPoints(hoverPolygonDefaultPoints)
            return
        }

        const {
            left: _x1,
            top: _y1,
            height: h1,
            width: w1,
        } = anchorElement.getBoundingClientRect()
        const {
            left: _x2,
            top: _y2,
            height: h2,
            width: w2,
        } = otherElement.getBoundingClientRect()

        const location = getElementLocation(anchorElement, otherElement)

        const hasToPickFirstDiagonal =
            location === 'top-right' || location === 'bottom-left'
                ? true
                : false

        // TODO: Use more sophisticated way of picking co-ordinates.
        // TODO: Only choose diagonal when otherElement is near to
        // TODO: then diagonal of anchorElement. Else, use the nearest
        // TODO: edge coordinates.

        // Anchor Element
        const x1 = hasToPickFirstDiagonal
            ? Math.trunc(_x1)
            : Math.trunc(_x1 + w1)
        const x2 = hasToPickFirstDiagonal
            ? Math.trunc(_x1 + w1)
            : Math.trunc(_x1)

        const y1 = hasToPickFirstDiagonal
            ? Math.trunc(_y1)
            : Math.trunc(_y1 + h1)
        const y2 = hasToPickFirstDiagonal
            ? Math.trunc(_y1 + h1)
            : Math.trunc(_y1)

        // Additional Element
        const x3 = hasToPickFirstDiagonal
            ? Math.trunc(_x2)
            : Math.trunc(_x2 + w2)
        const x4 = hasToPickFirstDiagonal
            ? Math.trunc(_x2 + w2)
            : Math.trunc(_x2)

        const y3 = hasToPickFirstDiagonal
            ? Math.trunc(_y2)
            : Math.trunc(_y2 + h2)
        const y4 = hasToPickFirstDiagonal
            ? Math.trunc(_y2 + h2)
            : Math.trunc(_y2)

        setHoverPolygonPoints({
            isValueSet: true,
            points: [
                { x: x1, y: y1 },
                { x: x3, y: y3 },
                { x: x4, y: y4 },
                { x: x2, y: y2 },
            ],
        })
    }

    useEffect(() => {
        if (isMouseOver === undefined) return
        if (isMouseOver && typeof onHoverStart === 'function') {
            onHoverStart()
        }
        if (!isMouseOver && typeof onHoverEnd === 'function') {
            onHoverEnd()
        }
    }, [isMouseOver])

    useEffect(() => {
        /**
         * Popper element takes some time to settle itself.
         * Therefore updating hover polygon points after 100ms.
         */
        setTimeout(() => updateHoverPolygonPoints(), 100)
    }, [otherElement, anchorElement])

    useEffect(() => {
        if (hoverPolygonPoints.isValueSet && isMouseOver) {
            document.addEventListener('mousemove', followCursor)
            if (isHoverPolygonVisible) {
                svg.append(hoverPolygonPoints.points)
            }
        } else {
            document.removeEventListener('mousemove', followCursor)

            if (isHoverPolygonVisible) {
                svg.remove()
            }
        }

        return () => {
            document.removeEventListener('mousemove', followCursor)
            if (isHoverPolygonVisible) {
                svg.remove()
            }
        }
    }, [hoverPolygonPoints, isMouseOver])

    useEffect(() => {
        if (!isDisabled) {
            if (anchorElement) {
                anchorElement.addEventListener('mouseenter', onMouseEnter)
                !otherElement &&
                    anchorElement.addEventListener('mouseleave', onMouseLeave)
            }
        }

        return () => {
            if (!isDisabled && anchorElement) {
                document.removeEventListener('mousemove', followCursor)
                anchorElement.removeEventListener('mouseenter', onMouseEnter)
                anchorElement.removeEventListener('mouseleave', onMouseLeave)
            }
        }
    }, [anchorElement, otherElement, isDisabled])

    return isMouseOver
}
