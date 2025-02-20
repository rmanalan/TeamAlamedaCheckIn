type BackdropProps = {
    src: string
}

function Backdrop({src}: BackdropProps) {
    return (
        <div style={{position:"absolute", display:"flex", justifyContent:"center", height:"100vh", width:"100vw", overflow:"hidden", zIndex:-1}}>
            <img style={{height:"100%", filter:"blur(4px)"}} src={src} alt="" />
        </div>    
    )
}

export default Backdrop