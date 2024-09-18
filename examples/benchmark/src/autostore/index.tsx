import React, { useEffect, useState } from 'react';
import {  createStore } from "autostore"
import { styled } from "flexstyled"

const bookStyle = styled({
    display:'flex',
    position:'relative',
    padding: "4px",
    borderBottom:"1px solid #ddd",
    alignItems:"center",
    "&>span":{
        padding:"12px 12px 0 0"
    }
},{className:"book"})



const store = createStore({
    books: Array.from({ length: 1000 }, (_, i) => {
        return {
            id         : i+1,
            name       : `Book-${i}`,
            description: `Description for item ${i+1}`,
            price      : 10,
            count      :i+1,
            total      : (book:any)=>book.price * book.count
        }
    }),
})

const BenchmarkTestComponent: React.FC = () => {
    
    const [renderTime, setRenderTime] = useState<number | null>(null);
    const [memoryUsageBefore, setMemoryUsageBefore] = useState<number | null>(null);
    const [memoryUsageAfter, setMemoryUsageAfter] = useState<number | null>(null);

    useEffect(() => {
        const memoryBefore = (performance as any).memory;
        if (memoryBefore) {
            setMemoryUsageBefore(memoryBefore.usedJSHeapSize);
        }
        const start = performance.now(); 
        // 使用 requestAnimationFrame 确保测量的是渲染完成后的时间
        requestAnimationFrame(() => {
            const end = performance.now();
            setRenderTime(end - start);

            const memoryAfter = (performance as any).memory;
            if (memoryAfter) {
                setMemoryUsageAfter(memoryAfter.usedJSHeapSize);
            }
        });
    }, []);

    return (
        <div>
            <h1>Benchmark Test</h1>
            {renderTime !== null && <p>Render Time: {renderTime.toFixed(2)} ms</p>}
            {   memoryUsageBefore!== null && 
                memoryUsageAfter !== null && 
                <p>Memory Usage: {((memoryUsageAfter-memoryUsageBefore) / 1024 / 1024).toFixed(2)} MB</p>}
            <div style={{width:'800px'}}>
                {store.state.books.map((book) => (
                    <div key={book.id} className={bookStyle.className}>
                        <span>#{book.id}</span>
                        <span>{book.name}</span>
                        <span style={{flexGrow:1}}>{book.description}</span>
                        <span style={{width:80}}>{book.price}</span>
                        <span style={{width:80}}>{book.count}</span>
                        <span style={{width:100}}>{book.total}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BenchmarkTestComponent;