import Backdrop from "../../Components/Backdrop"
import BackSVG from "../../Components/BackSVG";
import HomePage from '../Home';
import { PageSetter } from '../../App';

import { Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from "react";
import CheckSVG from "../../Components/CheckSVG";

import "./index.css"
import { ASClient } from "../../Tools/ASClient";
import TextInput, { nameIsValid, numberIsValid, onPhoneNumberInput } from "../../Components/TextInput";

const client: ASClient = new ASClient();
let madeNewLog = false

function LeaderPage() {
    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<string>("")

    const [makeNewLog, setMakeNewLog] = useState<boolean | undefined>(undefined)
    const [scan, setScan] = useState<string>("LOADING")

    const leaderDataOK = nameIsValid(name) && numberIsValid(number)

    if (makeNewLog === undefined) {
        client.fetch("/needNewLog", {}).then(t => {
            if (t.startsWith("OK")) {
                setMakeNewLog(t.split(" ")[1].trim()=="true");
                if (makeNewLog) {
                    madeNewLog = false
                }
                if (!(t.split(" ")[1].trim()=="true")) {
                    setScan("UNSCANNED")
                }
            }
        })
    }

    if (leaderDataOK) {
        localStorage.setItem("leaderData", JSON.stringify({name: name, number:number}))
        if (makeNewLog && !madeNewLog) {
            madeNewLog = true
            client.fetch("/newLog", {name:name, number:number}).then(() => {
                setScan("UNSCANNED")
            })
        }
    }

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
                        {scan==="UNSCANNED" ? 
                            <Scanner styles={{container:{borderRadius:"20px", backgroundColor:"#fff"}, video:{borderRadius:"20px"}}} onScan={(qr) => {
                                try {
                                    const json = JSON.parse(qr[0].rawValue)
                                    console.log("guest",json.guest)
                                    client.fetch(json.guest?"/newGuestRider":"/newRider", json).then(t => {
                                        if (t.startsWith("ERROR")) {
                                            setScan("ERROR")
                                        }
                                        setScan("UNSCANNED")
                                    })
                                    setScan("OK")
                                } catch (error) {
                                    console.log(error)
                                    setScan("ERROR")
                                    window.setTimeout(() => {setScan("UNSCANNED")}, 1500);
                                }
                            }}/>
                            : 
                            scan==="OK" ?
                                <div style={{padding:"20px"}}>
                                    <CheckSVG/>
                                </div>
                            : 
                                scan==="LOADING" ?
                                    <div>
                                        LOADING
                                    </div>   
                                :
                                    <div>
                                        ERROR
                                    </div>                   
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderPage