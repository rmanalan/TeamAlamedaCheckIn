import Backdrop from "../../Components/Backdrop"
import BackSVG from "../../Components/BackSVG";
import HomePage from '../Home';
import { PageSetter } from '../../App';

import { Scanner } from '@yudiel/react-qr-scanner';


function LeaderPage() {
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

                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"50%", flexGrow:0}}>
                    <div style={{display:"flex", justifyContent:"center", height:"100%", aspectRatio:1, borderRadius:"20px", backgroundColor:"rgb(42,79,113)"}}>
                        <Scanner onScan={(qr) => {console.log(JSON.parse(qr[0].rawValue))}}/>
                        {/* <h1 style={{color:"#fff", transform:"translateY(35%)"}}>Scanner</h1> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderPage