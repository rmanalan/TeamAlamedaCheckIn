import Backdrop from "../../Components/Backdrop"
import BackSVG from "../../Components/BackSVG";
import CheckSVG from "../../Components/CheckSVG";
import TextInput from "../../Components/TextInput";
import HomePage from '../Home';

import { nameIsValid, numberIsValid, onPhoneNumberInput } from "../../Components/TextInput"
import { ASClient } from "../../Tools/ASClient";
import { PageSetter } from '../../App';

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from "react";

import "./index.css"

const client: ASClient = new ASClient();

function ScannerState(name:string, number:string) {
    const [state, setState] = useState<string>("CHECKLOG")

    let handleOnScan = (_:IDetectedBarcode[]) => {}

    switch (state) {
        // initial state
        case "CHECKLOG":
            const makeNewLog = () => {
                client.fetch("/newLog", {name:name, number:number}).
                then(t => {
                    if (t.startsWith("OK")) {setState("ENTERDATA")} 
                    else {setState("ERROR")}
                }).
                catch(() => {
                    setState("ERROR")
                })
            }

            const checkNewLog = () => {
                client.fetch("/needNewLog", {}).
                then(t => {
                    if (t.startsWith("OK")) {
                        // need new log?
                        if (t.split(" ")[1].trim()=="true") {makeNewLog()} 
                        else {setState("ENTERDATA")}
                    } else {
                        setState("ERROR")
                    }
                }).
                catch(() => {
                    setState("ERROR")
                })
            }

            // used to see if we can skip this, but its a bit janky, needs a global
            checkNewLog()

            break
        case "ENTERDATA":
            if (nameIsValid(name) && numberIsValid(number)) {
                localStorage.setItem("leaderData", JSON.stringify({name:name, number:number}))
                setState("SCANNING")
            }
            break
        case "SCANNING":
            handleOnScan = (qr:IDetectedBarcode[]) => {
                try {
                    const json = JSON.parse(qr[0].rawValue)

                    client.fetch(json.guest?"/newGuestRider":"/newRider", json).
                    then(t => {
                        if (t.startsWith("OK")) {
                            setState("SCANNED")
                        } else {
                            setState("ERROR")
                        }
                    }).
                    catch(() => {
                        setState("ERROR")
                    })
                    setState("PENDING") // be responsive while waiting for actual scan result
                } catch (error) {
                    setState("ERROR")
                }
            } 
            break
        case "PENDING":
            break
        case "SCANNED":
            window.setTimeout(() => setState("SCANNING"), 500) // able to rescan, transistion back to scanning state
            break
        case "ERROR":
        default:
            window.setTimeout(() => setState("CHECKLOG"), 1500) // something broke, go back to initial, se what can be skipped
            break
    }

    const stateLabel = (name: string) => {
        return (
            <div style={{display:"flex", justifyContent:"center", height:"100%", aspectRatio:1, borderRadius:"20px", backgroundColor:"#fff"}}>
                <h1 style={{color:"rgb(42,79,113)", transform:"translateY(35%)"}}>{name}</h1>
            </div>  
        )
    }

    switch (state) {
        case "SCANNING":  return (<Scanner styles={{container:{borderRadius:"20px", backgroundColor:"#fff"}, video:{borderRadius:"20px"}}} onScan={handleOnScan}/>)
        case "CHECKLOG":  return stateLabel("Loading")
        case "ENTERDATA": return stateLabel("Enter Data")
        case "PENDING":   return stateLabel("Uploading...")
        case "SCANNED":   return (<div style={{padding:"20px"}}><CheckSVG/></div>)
        case "ERROR":
        default:          return stateLabel("Error")
    }
}

function LeaderPage() {
    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<string>("")

    useEffect(() => {
        const previousInput = localStorage.getItem("leaderData");
        const hasPreviousInput = previousInput!==null&&previousInput!==undefined
        if (hasPreviousInput) {
            const riderData = JSON.parse(previousInput)
            setName(riderData.name);
            setNumber(riderData.number);
        }
    }, [])

    return (
        <div style={{width:"100%", height:"100%"}}>
            <div 
                style={{display:"flex", justifyContent:"center", position:"absolute", left:"10px", top:"10px", width:"30px",height:"30px", borderRadius:"15px", backgroundColor:"#fff"}}
                onClick={() => PageSetter(<HomePage/>)}
            >
                <BackSVG/>
            </div>

            <Backdrop src="Meetup.png"/>

            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"column", width:"75%", height:"75%", padding:"20px", margin:"auto", backgroundColor:"white", borderRadius:"20px", transform:"translateY(9%)", filter:"drop-shadow(20px 20px 20px #000)"}}>
                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"30%", paddingBottom:"15px", flexGrow:0}}>
                    <img style={{height:"100%", aspectRatio:1}} src="TeamAlamedaLogo.png" alt="" />
                </div>

                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%", flexGrow:0}}>
                    <TextInput setValue={setName}            value={name}            placeholder="Leader Name"             isValid={nameIsValid}   onInput={() => {}}/>
                    <TextInput setValue={setNumber}          value={number}          placeholder="Leader Number"           isValid={numberIsValid} onInput={onPhoneNumberInput}/>
                </div>

                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"50%", padding:"20px", flexGrow:0}}>
                    <div className="scanner" style={{display:"flex", justifyContent:"center", height:"100%", aspectRatio:1, borderRadius:"20px", backgroundColor:""}}>
                        {ScannerState(name, number)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderPage