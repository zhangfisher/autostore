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
        "& .help":{
            color:"#ccc"
        },
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
        "&>textarea": {
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
		fontWeight:"bold"
    },
    "&.invalid>label": {
        color: "red"
    }
},{
    className:"x-field"
})




export const LiteFieldStyle = styled({
    display:"flex",
    alignItems:"center",
	width:"100%",
    flexDirection:"row",
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
	"&>textarea": {
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
	"&>select": {
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
	"& input[type=checkbox]": {
		cursor: "pointer",
	},
	"& input[type=radio]": {
		cursor: "pointer",
	},
	"& label:has(input[type=radio])":{
		cursor: "pointer",
	},
    "&>label":{
        color: "#666",
        fontSize: "14px",
        margin: "4px",
        flexShrink: 0,
        width: "100px",
		fontWeight:"bold"
    }, 
},{
    className:"x-lite-field"
})



export const Fit = styled({
	display:"flex",
	position:'absolute',
	top:"0px",
	left:"0px",
	width:"100%",
	height:"100%",
	color:"white",
	justifyContent: "center",
	alignItems:'center',
	flexDirection:"column",
	background:"rgba(100,100,100,0.6)"
})	
