import { createStore } from '@autostorejs/react';
import React from "react"
import { ColorBlock, Button, Box } from "x-react-components"

const { state, $ } = createStore({
    firstName: "Zhang",
    lastName: "Fisher",
    age: 18
})

const FirstName = () => {
    return <ColorBlock name={`子组件:FirstName`}>{$('firstName')}</ColorBlock>
}
const LastName = () => {
    return <ColorBlock name={`子组件:LastName`}>{$('lastName')}</ColorBlock>
}

let count = 0
export default () => {
    return <>
        <Box title="根组件">
            <ColorBlock name="FullName">{$('firstName')}{' '}{$('lastName')}</ColorBlock>
            <ColorBlock name="Age">{$('age')}{' - '}{++count}</ColorBlock>
        </Box>
        <Box title="子组件">
            <FirstName />
            <LastName />
        </Box>
        <Button onClick={() => state.age = state.age + 1}>+Age</Button>
        <Button onClick={() => state.firstName = state.firstName + "."}>Change FirstName</Button>
        <Button onClick={() => state.lastName = state.lastName + "❤️"}>Change LastName</Button>

    </>
} 
