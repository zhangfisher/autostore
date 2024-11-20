# Dirty
Form `dirty` attribute indicates whether the form has been modified. If any field in the form is modified,`dirty` the attribute will become `true`.

 `useForm` will return one `dirty` the state is used to indicate whether the current form is verified.

```ts {2}
	const { 
      dirty
    } = useForm({
        // ...
    }）
```

- `dirty` it is a response state that triggers automatically re -rendering when changes.
- `dirty` value `true` the representative form has been modified,`false` the representative form has not been modified.
- Call `reset` methods to reset the form `dirty` state.

```ts {3}   
	const { 
      dirty,
      reset
    } = useForm({
        // ...
    })
```