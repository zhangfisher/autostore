/**
 * 每次渲染时变化颜色
 */

import React, { useRef, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Loading } from "./Loading";
 // const Colors:string[]=[]

const presetColors:string[] = [
	"#ff4d4f","#a8071a",
	"#ff7a45","#ad2102",
	"#ffa940","#ad4e00",
	"#ffc53d","#ad6800",
	"#bae637","#5b8c00",
	"#73d13d","#237804",
	"#36cfc9","#006d75",
	"#4096ff","#003eb3",
	"#597ef7","#10239e",
	"#9254de","#391085",
	"#f759ab","#9e1068",
	'#4bc703','#eb03c4',
	'#eb7d00',"#99170e991",
	'red','#028b8b9'
]


let colorIndex = 0;

/**
 * 从presetColors中随机获取一个颜色
 */
function getRandomColor() {
	colorIndex++
	if(colorIndex >= presetColors.length) {
		colorIndex = 0
	}
	return presetColors[colorIndex] 
}

export type ColorBlockProps = React.PropsWithChildren<
	Pick<React.HTMLAttributes<HTMLElement>, "className" | "style"> & {
		value?: any;
		name?: string;
		loading?: boolean;		
		comment?: string;
		inline?: boolean
	}
>;

export const ColorBlock: React.FC<ColorBlockProps> =(props) => {
		const renderCount = useRef(0);
		const { name, value = "",loading =false,comment,inline } = props;
		const backgroundColor = getRandomColor();
		let textColor = "white"; 

		useEffect(() => {
			renderCount.current++; 
		});

		return (
			<div 
				style={{
					backgroundColor,
					padding: "6px",
					color: textColor,
					display: inline ? "inline-flex ": "flex",
					...props.style,
					alignItems: "center",
				}}
			>
				<span style={{display:"flex",alignItems: "center",flexGrow:1}}>
					{name ? <span style={{ padding: "4px",flexShrink:0,minWidth:'80px' }}>{name}</span> : null}
					{name ? <span style={{padding:'4px',flexShrink:0}}>:&nbsp;</span> : null }
					<span style={{ padding: "4px",flexGrow:1 }}>
						{String(value)}
						{props.children}
					</span>
				</span>		
				{ comment ? <span style={{ paddingRight: "6px ",flexShrink:0 }}>{comment}</span> : null}
				{ loading ? <Loading color='white'/> : null}
				<span title="Render Count" style={{ fontSize: "8px" ,paddingLeft:'6px'}}>{renderCount.current}</span>
			</div>
		);
	} 