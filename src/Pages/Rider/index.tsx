import Backdrop from "../../Components/Backdrop"
import BackSVG from "../../Components/BackSVG"
import HomePage from "../Home";
import TextInput from "../../Components/TextInput"

import { nameIsValid, numberIsValid, onPhoneNumberInput } from "../../Components/TextInput";
import { useEffect, useState } from "react";
import { PageSetter } from "../../App";

import QRCode from "react-qr-code";



type RiderData = {
    guest: boolean
    name: string
    number: string
    emergencyNumber: string
}

type RiderProps = {
    guest: boolean
}



function RiderPage({guest}:RiderProps) {
    const [qr, setQr] = useState<boolean>(false)
    
    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<string>("")
    const [emergencyNumber, setEmergencyNumber] = useState<string>("")

    const valuesValid =  (): boolean => nameIsValid(name)&&numberIsValid(number)&&numberIsValid(emergencyNumber)
    const getRiderData = (): RiderData => {return {guest:guest, name:name, number:number, emergencyNumber:emergencyNumber}}

    const localStorageKey = guest?"guestRiderData":"riderData"

    useEffect(() => {
        const previousInput = localStorage.getItem(localStorageKey);
        const hasPreviousInput = previousInput!==null&&previousInput!==undefined
        if (hasPreviousInput) {
            const riderData = JSON.parse(previousInput)
            setName(riderData.name);
            setNumber(riderData.number);
            setEmergencyNumber(riderData.emergencyNumber);
            
            if (nameIsValid(riderData.name)&&numberIsValid(riderData.number)&&numberIsValid(riderData.emergencyNumber)) {
                setQr(true)
            }
        }
    }, [])

    const handlePhoneNumber = (e: React.FormEvent<HTMLSpanElement>) => {
        setQr(false)
        onPhoneNumberInput(e);
    }

    return (
        <div style={{width:"100%", height:"100%"}}>
            <div 
                style={{display:"flex", justifyContent:"center", position:"absolute", left:"10px", top:"10px", width:"30px",height:"30px", borderRadius:"15px", backgroundColor:"#fff"}}
                onClick={() => PageSetter(<HomePage/>)}
            >
                <BackSVG/>
            </div>

            <Backdrop src="Meetup.png"/>

            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"column", width:"75%", height:"77%", padding:"20px", margin:"auto", backgroundColor:"white", borderRadius:"20px", transform:"translateY(9%)", filter:"drop-shadow(20px 20px 20px #000)"}}>
               
                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"30%", paddingBottom:"15px", flexGrow:0}}>
                    <img style={{height:"100%", aspectRatio:1}} src="TeamAlamedaLogo.png" alt="" />
                </div>

                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%", flexGrow:0}}>
                    <TextInput setValue={setName}            value={name}            placeholder="Name"             isValid={nameIsValid}   onInput={() => setQr(false)}/>
                    <TextInput setValue={setNumber}          value={number}          placeholder="Number"           isValid={numberIsValid} onInput={handlePhoneNumber}/>
                    <TextInput setValue={setEmergencyNumber} value={emergencyNumber} placeholder="Emergency Number" isValid={numberIsValid} onInput={handlePhoneNumber}/>
                </div>

                <div style={{display:"flex", justifyContent:"center", marginBottom:"15px", width:"100%", flexGrow:0}}>
                    <button 
                        style={{width:"100%",padding:"12px", border:"none", borderRadius:"10px", backgroundColor:"rgb(42,79,113)", filter:valuesValid()?"":"brightness(75%)", color:"#fff"}}
                        disabled={!valuesValid()}
                        onClick={() => {
                            setQr(true)
                            localStorage.setItem(localStorageKey, JSON.stringify(getRiderData()))
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
                            <QRCode style={{height:"100%", border:""}} value={JSON.stringify(getRiderData())}/> 
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RiderPage