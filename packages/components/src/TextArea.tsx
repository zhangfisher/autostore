import { styled } from "flexstyled"



export type TextAreaProps = React.PropsWithChildren<HTMLInputElement & {
    lable?:string
    labelPos?: 'left' | 'right'
}>

const TextAreaStyle = styled<TextAreaProps>({
    padding:"4px",
    margin:"4px",
    display:"flex",
    alignItems:"center",
    cursor:"pointer",
    "&>label":{
        padding:"4px",
        userSelect:"none",       
        cursor:"pointer",
    },
    "&>textarea":{
        margin:"0px",
        padding:"0px",
        width:"1.2em",
        height:"1.2em",
        cursor:"pointer",
    },
},{
    className:"x-TextArea"
})


export const TextArea:React.FC<TextAreaProps> = (props)=>{
    
    // @ts-ignore
    const { id=Math.random().toString(36).slice(2)} = props

     // @ts-ignore
    const label = props.label || props.name || props.id
    return <div className={TextAreaStyle.className} style={TextAreaStyle.getStyle(props)}>
               <label htmlFor={id}>{label}</label>    
              {/* @ts-ignore */}
              <textarea {...props} id={id} type="TextArea">                      
            </textarea>
    </div>    
}