import { createStore } from "@autostorejs/react"


export const todos = createStore({
    todos: [
        { text: "Learn JavaScript", beginTime: 1728293520885, done: true },
        { text: "Learn React", beginTime: 1728293522981, done: false },
        { text: "Build an app", beginTime: 17282935108222, done: false }
    ],
    count: (scope:any)=>scope.todos.length
},{
    id:"todos"
})