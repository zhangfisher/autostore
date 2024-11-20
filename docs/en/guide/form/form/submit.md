# Submit form

## Standard submission
 
Only need to be `form` add to element `<input type='submit'/>` or `<button type='submit'>` just accept it.

All behaviors are the default behavior of the browser.

## Ajax submission

 `useForm` provide `submit` method for progress `AJAX` submit the form.

- `submit` method trigger `submit` event, you can pass `onSubmit` supervise the incident.
- Then `onSubmit` in the event, use `AJAX/fetch` just submit the form data to the server.
- `submiting` the attribute is used to identify whether the form is being submitted, and it can be used to control the state of the submission button.

 **The example is as follows:** 

<demo react ="form/form/formSubmit.tsx"/>
