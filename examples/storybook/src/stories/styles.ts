import { styled } from "flexstyled";

export const FieldStyle = styled({
    display:"flex",
    alignItems:"center",
	width:"100%",
    flexDirection:"row",
	"&>div":{		
		flexGrow:1, 
		display:"flex",
		flexDirection:"column", 
		"&>input": {
			border:  "1px solid #bbb",
			borderRadius: "4px",
			display: "flex",
			margin: "6px",
			padding: "6px",
			flexGrow:1,  
			"&:focus":{
				outline:"none",
				boxShadow:"0 0 0 1px rgba(231, 231, 231, 0.6)"
			},
			"&.invalid":{
				border:"1px solid red",
				color:"red"
			}
		},   
        "&>span[data-validate-field]":{
            display:"none",
            color:"blue",
            "&.invalid":{
                display:"block",
                color: "red" 
            }
        }
	},    
    "&>label":{
        color: "#666",
        fontSize: "14px",
        margin: "4px",
        flexShrink: 0,
        width: "100px",
    },
    "&.invalid>label": {
        color: "red"
    }
},{
    className:"x-field"
})
