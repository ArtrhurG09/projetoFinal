import { useEffect, useRef, useState } from "react"
import { Renderer } from "vexflow"
import { Compass } from "./music/Compass"
import ConfigCompass from "./ConfigCompass"
import { getNoteFromY } from "./music/noteFromPosition"

function Sheet() {
    const container = useRef(null)

    const [compassWidth] = useState(400)
    const [changeCompassNumber, setChangeCompassNumber] = useState(null)

    const [compassArray, setCompassArray] = useState([
        {
            clef: "treble",
            width: 400,
            showTimeAndKeySignature: true,
            timeSignature: "4/4",
            tone: "C",
            notes: []
        }
    ])
    

    function getLayout() {
        const element = container.current
        if (!element) return null
        const startX = 20
        const startY = 40
        const lineHeight = 120
        const availableWidth = element.clientWidth || 800
        const columns = Math.max(
            1,
            Math.floor(
                (availableWidth - startX) / compassWidth
            )
        )
        return {
            startX,
            startY,
            lineHeight,
            availableWidth,
            columns
        }
    }
    useEffect(() => {
        const element = container.current
        if (!element) return
        element.innerHTML = ""
        const layout = getLayout()
        if (!layout) return
        const {
            startX,
            startY,
            lineHeight,
            availableWidth,
            columns
        } = layout
        const rows = Math.ceil(
            compassArray.length / columns
        )
        const height =
            startY +
            rows * lineHeight +
            50
        const renderer = new Renderer(
            element,
            Renderer.Backends.SVG
        )
        renderer.resize(
            availableWidth,
            height
        )
        const context = renderer.getContext()
        compassArray.forEach((compass, index) => {
            const column = index % columns
            const row = Math.floor(
                index / columns
            )
            const x = startX + column * compassWidth
            const y = startY + row * lineHeight
            new Compass({
                ...compass,
                x,
                y,
                width: compassWidth,
                context,
                clef: compass.clef || "treble",
                notes: compass.notes || [] 
            })
        })

    }, [
        compassArray,
        compassWidth
    ])

    function addCompass() {
        setCompassArray(prev => {
            const last = prev[prev.length - 1]
            return [
                ...prev,
                {
                    clef: last.clef,
                    timeSignature: last.timeSignature,
                    tone: last.tone,
                    width: compassWidth,
                    showTimeAndKeySignature: false,
                    notes: []
                }
            ]
        })
    }

    function removeCompass(){
        if (compassArray.length > 1){
            setCompassArray(compassArray.filter((item) => item !== compassArray[compassArray.length-1]))
        }
    }

    //setChangeCompassNumber(i)



    function configCompass(x, y) {
        const layout = getLayout()
        if (!layout) return
        const {
            startX,
            startY,
            lineHeight,
            columns
        } = layout
        for (let i = 0;i < compassArray.length;i++) {
            const column = i % columns
            const row = Math.floor(i / columns)
            const compassX = startX +column * compassWidth
            const compassY = startY + row * lineHeight
            const insideX = x >= compassX && x <= compassX + compassWidth
            const insideY = y >= compassY && y <= compassY + lineHeight
            if (insideX && insideY) {
                setChangeCompassNumber(i)
                return
            }
        }
    }


    return (
        <div>
            <div
                ref={container}
                style={{
                    width: "100%",
                    minHeight: "200px"
                }}
                onClick={(event) => {
                    const rect =
                        event.currentTarget.getBoundingClientRect()
                    const x =
                        event.clientX -
                        rect.left
                    const y =
                        event.clientY -
                        rect.top
                    configCompass(x, y)
                }}
            />

            <div className="d-flex gap-1">
                <button className="btn btn-dark" onClick={addCompass}>+</button>
                <button className="btn btn-dark" onClick={removeCompass}>-</button>
            </div>
            {changeCompassNumber !== null && <ConfigCompass changeCompassNumber={changeCompassNumber} setChangeCompassNumber={setChangeCompassNumber} compassArray={compassArray} setCompassArray={setCompassArray} config={compassArray[changeCompassNumber]}></ConfigCompass>}
        </div>
    )
}

export default Sheet
