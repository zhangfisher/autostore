import { useRef, useState } from "react"

export type StarProps = {
    max?:number
    value?:number
}


export const Star:React.FC<StarProps> = (props)=>{
    const {max=5,value=1} = props
    const stars = Array.from({length:max})
    const ref = useRef<HTMLDivElement>(null)
    const [newValue,setValue ] = useState<number>(value)   
    return <div ref={ref} 
        style={{
            display:'flex',
            flexDirection:'row',
            fontSize:'1.2em'
        }}>
        { stars.map((_,i)=>{
            return   <span key={i} 
                style={{
                    cursor:'pointer',
                    padding:'4px',
                    color: i< newValue ? '#ffe70c' : '#ccc'
                }}
                onClick={()=>{
                    setValue(i===newValue-1 ? i : i+1)
                    const inputEvent = new InputEvent('input', {
                        bubbles: true, // 事件是否应该冒泡
                        cancelable: true, // 事件是否可以取消
                        data: newValue, 
                    });
                    ref.current!.dispatchEvent(inputEvent)
                }}
            >
            <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" 
                fill="currentColor" aria-hidden="true">
                <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
            </svg>   </span>     
        })
    }
    </div>
}