import Backdrop from "../../Components/Backdrop"

function HomePage() {
    return (
        <div style={{width:"100%", height:"100%"}}>
            <Backdrop src="/Meetup.png"/>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"column", width:"75%", height:"50%", padding:"20px", margin:"auto", backgroundColor:"white", borderRadius:"20px", transform:"translateY(42.5%)", filter:"drop-shadow(20px 20px 20px #000)"}}>
                <div style={{display:"flex", justifyContent:"center", width:"100%", height:"50%", flexGrow:0}}>
                    <img style={{height:"100%", aspectRatio:1}} src="/TeamAlamedaLogo.png" alt="" />
                </div>

                <div style={{display:"flex", justifyContent:"center", width:"100%", flexGrow:0}}>
                    <button 
                        style={{width:"70%",padding:"12px", border:"none", borderRadius:"10px", backgroundColor:"rgb(42,79,113)", color:"#fff"}}
                        onClick={() => document.location = "/Leader"}
                    >
                        Leader
                    </button>
                </div>

                <div style={{display:"flex", justifyContent:"center", width:"100%", flexGrow:0}}>
                   <button 
                        style={{width:"70%",padding:"12px", border:"none", borderRadius:"10px", backgroundColor:"rgb(42,79,113)", color:"#fff"}}
                        onClick={() => document.location = "/Rider"}
                    >
                        Rider
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage