import { AsYouType, isValidPhoneNumber } from "libphonenumber-js"
import { useRef } from "react"

import "./index.css"



type TextInputProps = {
    value: string
    setValue: React.Dispatch<string>
    placeholder: string
    isValid: any
    onInput: any
}

// handler for oninput with phone number, formats phone number as you type
export const onPhoneNumberInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const span = (e.target as HTMLSpanElement)
    span.innerText = new AsYouType("US").input(span.innerText)
    
    // Move cursor to the end
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(span);
    range.collapse(false); // Collapse to the end
    selection?.removeAllRanges();
    selection?.addRange(range);
    span.focus(); // Ensure the span is focused
}

// used with isvalid for names and numbers
export const nameIsValid = (name: string) => name.trim()!=""
export const numberIsValid = (number: string) => {
    number = number.trim()
    return number!="" && isValidPhoneNumber(number, "US")
}



function TextInput({value, setValue, placeholder, isValid, onInput}: TextInputProps) {
    const ref = useRef(null)

    // set inital text
    if (ref.current) {
        if ((ref.current as HTMLSpanElement).innerText == "" && value.trim() != "") {
            (ref.current as HTMLSpanElement).innerText = value
        }
    }

    return (
    <span 
        ref={ref}
        style={{width:"100%", height:"24px", margin:"auto", paddingLeft:"5px", marginBottom:"5px", border:`2px solid ${isValid(value)?"black":"red"}`, borderRadius:"7px"}} 
        onInput={e => {
            setValue((e.target as HTMLSpanElement).innerText);
            onInput(e)
        }} 
        onKeyDown={e => {if (e.key==="Enter"){e.preventDefault()}}}
        contentEditable 
        data-placeholder={placeholder}
    />   
    ) 
}

export default TextInput