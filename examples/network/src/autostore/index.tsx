import React, { useEffect, useState } from 'react';
import {  createStore } from "@autostorejs/react"
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


    return (
        <div>
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