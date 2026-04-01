
import React from 'react'

export type LoadingProps ={
    visible?:boolean
    size?: number
    color?:string
    tips?:string
    title?:string
}

const Spinner: React.FC<{ size?: number; color?: string }> = ({
    size = 20,
    color = '#3b82f6'
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={size}
            height={size}
            fill={color}
            style={{
                display: 'inline-block',
                verticalAlign: 'middle'
            }}
        >
            <path
                opacity=".25"
                d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
            />
            <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 16 16"
                    to="360 16 16"
                    dur="0.8s"
                    repeatCount="indefinite"
                />
            </path>
        </svg>
    )
}

export const Loading:React.FC<LoadingProps> = (props)=>{
    const { size=20,visible=true,color,tips='loading...' } =props
    return <span
        title={tips}
        style={{
            display: visible ? 'inline-flex' : 'none',
            cursor:"pointer",
            padding:"2px",
            alignItems:"center",
        }}>
        <Spinner size={size} color={color}/>
        {props.title ? <span style={{marginLeft:"4px"}}>{props.title}</span> : null}
    </span>
}
