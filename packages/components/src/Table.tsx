/**
 * <Table 
 *     cols={["price","count","total"]}
 *     rows={[
 *        [100,2,200],
 *        [200,3,600],
 *        ...
 *      ]}
 *      
 * >
 *      <div className="header"></div>
 *      <div className="footer"></div>
 * </Table>
 * 
 * 
 * 
 */
import React, { ReactNode }  from 'react'
import { styled } from 'flexstyled'

const TableStyle =styled<TableProps>({
    width: "100%",
    marginBottom: "1rem",
    color: "#212529",
    backgroundColor: "white",
    borderCollapse: "collapse",
    border: "1px solid #dee2e6",
    "& th":{
        backgroundColor: "#f7f7f7",
    },
    "& th,td":{
        padding: ".5rem",
        verticalAlign: "top",
        border: "1px solid #dee2e6"
    },
    "& td":{
        padding: ".5rem",
        border: "1px solid #dee2e6",
        verticalAlign: "middle"
    },
    "& tfoot":{
        backgroundColor: "#f7f7f7",
        padding: ".75rem",
    }
},{
    className:"x-table"
})

export type TableCol =   {
    name:string
    align?:'left'|'center'|'right'
    width?:string
}

export type TableProps =React.PropsWithChildren<{
    title?:string,
    cols:(string | TableCol | (()=>ReactNode))[],                      // 声明列        
    rows?:any[][]
}> 

export const Table:React.FC<TableProps> = (props)=>{
    const cols:TableCol[] = props.cols.map(col=>{
        const colDef:TableCol =  typeof(col)==='string' ? {
            name:col,
            align:'center'
        } : col
        if(colDef.name.startsWith("<")){
            colDef.align = 'left'
            colDef.name = colDef.name.substring(1)
        }
        if(colDef.name.startsWith(">")){
            colDef.align = 'right'
            colDef.name = colDef.name.substring(1)
        }
        return colDef
    })

    return (<table
            className={TableStyle.className}
            style={TableStyle.getStyle(props)} >
                <thead>                    
                    { props.title ? 
                    <tr>
                        <th colSpan={cols.length}>{props.title}</th>
                    </tr> : null
                    }
                    <tr>
                        {cols?.map((col,i)=><th 
                            key={i}
                            style={{
                                width: col.width ? col.width : undefined,
                                textAlign: col.align ? col.align : undefined
                            }}
                        >{col.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.rows?.map((row,i)=><tr key={i}>
                        {                            
                            row.map((col,j)=>{
                                let colspan = 1
                                if(col==undefined) return undefined
                                for(let k=j+1;k<row.length;k++){
                                    // eslint-disable-next-line
                                    if(row[k]==undefined){
                                        colspan++
                                    }else{
                                        break
                                    }
                                }
                                return <td key={j} 
                                    colSpan={colspan > 1 ? colspan : undefined}
                                    style={{
                                        textAlign: cols[j].align
                                    }}
                                >
                                    {typeof(col)==='function' ? col() :  String(col)}
                                </td>
                            })
                        }
                    </tr>)}
                </tbody>
                { props.children ?
                <tfoot>
                    <tr>
                        <td colSpan={cols.length}>{props.children}</td>
                    </tr>
                </tfoot>
                :null    
            }
            
        </table>)
}
