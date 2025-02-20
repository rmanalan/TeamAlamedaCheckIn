import Backdrop from "../../Components/Backdrop"
import BackSVG from "../../Components/BackSVG"

import QRCode from "react-qr-code";

import { useEffect, useRef, useState } from "react";

import "./index.css"

function nameIsValid(name: string) {
    return name!=""
}

function numberIsValid(number: string) {
    return number!=""
}

function RiderPage() {
    const [qr, setQr] = useState<boolean>(false)
    
    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [emergencyNumber, setEmergencyNumber] = useState<string>("")

    const nameRef = useRef(null)
    const numberRef = useRef(null)
    const emergencyNumberRef = useRef(null)

    const valuesValid = () => nameIsValid(name)&&numberIsValid(number)&&numberIsValid(emergencyNumber)
    const previousInput = localStorage.getItem("riderData");
    const hasPreviousInput = previousInput!==null&&previousInput!==undefined

    useEffect(() => {
        if (hasPreviousInput && nameRef.current && numberRef.current && emergencyNumberRef.current) {
            const riderData = JSON.parse(previousInput)
            setName(riderData.name);
            setNumber(riderData.number);
            setEmergencyNumber(riderData.emergencyNumber);

            (nameRef.current as HTMLSpanElement).innerText = riderData.name;
            (numberRef.current as HTMLSpanElement).innerText = riderData.number;
            (emergencyNumberRef.current as HTMLSpanElement).innerText = riderData.emergencyNumber;  
            
            if (nameIsValid(riderData.name)&&numberIsValid(riderData.number)&&numberIsValid(riderData.emergencyNumber)) {
                setQr(true)
            }
        }
    }, [])

    console.log("name:<"+name+">")

    return (
        <div style={{width:"100%", height:"100%"}}>
            <div 
                style={{display:"flex", justifyContent:"center", position:"absolute", left:"10px", top:"10px", width:"30px",height:"30px", borderRadius:"15px", backgroundColor:"#fff"}}
                onClick={() => document.location="/"}
            >
                <BackSVG/>
            </div>

            <Backdrop src="/Meetup.png"/>

            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"column", width:"75%", height:"77%", padding:"20px", margin:"auto", backgroundColor:"white", borderRadius:"20px", transform:"translateY(9%)", filter:"drop-shadow(20px 20px 20px #000)"}}>
               
                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"30%", paddingBottom:"15px", flexGrow:0}}>
                    <img style={{height:"100%", aspectRatio:1}} src="/TeamAlamedaLogo.png" alt="" />
                </div>

                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%", flexGrow:0}}>
                    <span 
                        ref={nameRef}
                        style={{width:"100%", height:"24px", margin:"auto", paddingLeft:"5px", marginBottom:"5px", border:`2px solid ${nameIsValid(name)?"black":"red"}`, borderRadius:"7px"}} 
                        onInput={e => {setName((e.target as HTMLSpanElement).innerText); setQr(false)}} 
                        onKeyDown={e => {if (e.key==="Enter"){e.preventDefault()}}}
                        contentEditable 
                        data-placeholder={"Name"}
                    />     
                    <span
                        ref={numberRef}
                        style={{width:"100%", height:"24px", margin:"auto", paddingLeft:"5px", marginBottom:"5px", border:`2px solid ${numberIsValid(number)?"black":"red"}`, borderRadius:"7px"}} 
                        onInput={e => {setNumber((e.target as HTMLSpanElement).innerText); setQr(false)}} 
                        onKeyDown={e => {if (e.key==="Enter"){e.preventDefault()}}}
                        contentEditable 
                        data-placeholder={"Phone Number"}
                    /> 
                    <span 
                        ref={emergencyNumberRef}
                        style={{width:"100%", height:"24px", margin:"auto", paddingLeft:"5px", marginBottom:"5px", border:`2px solid ${numberIsValid(emergencyNumber)?"black":"red"}`, borderRadius:"7px"}} 
                        onInput={e => {setEmergencyNumber((e.target as HTMLSpanElement).innerText); setQr(false)}} 
                        onKeyDown={e => {if (e.key==="Enter"){e.preventDefault()}}}
                        contentEditable 
                        data-placeholder={"Emergency Phone Number"}
                    />                
                </div>

                <div style={{display:"flex", justifyContent:"center", marginBottom:"15px", width:"100%", flexGrow:0}}>
                    <button 
                        style={{width:"100%",padding:"12px", border:"none", borderRadius:"10px", backgroundColor:"rgb(42,79,113)", filter:valuesValid()?"":"brightness(75%)", color:"#fff"}}
                        disabled={!valuesValid()}
                        onClick={() => {
                            setQr(true)
                            console.log(name, number, emergencyNumber)
                            localStorage.setItem("riderData", JSON.stringify({name:name, number:number, emergencyNumber:emergencyNumber}))
                        }}
                    >
                        Generate QR
                    </button>
                </div>

                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"50%", flexGrow:0}}>
                    {
                    !qr ?
                        <div style={{display:"flex", justifyContent:"center", height:"100%", aspectRatio:1, borderRadius:"20px", backgroundColor:"rgb(42,79,113)"}}>
                            <h1 style={{color:"#fff", transform:"translateY(35%)"}}>QR</h1>
                        </div>
                    :
                        <div style={{height:"100%",padding:"5px", border:"2px solid black"}}>
                            <QRCode style={{height:"100%", border:""}} value={JSON.stringify({name:name, number:number, emergencyNumber:emergencyNumber})}/> 
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RiderPage