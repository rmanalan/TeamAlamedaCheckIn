// apps script client
export class ASClient {
    // HIDE ME EVENTUALLY
    #sheet = "https://script.google.com/macros/s/AKfycbzushZ9-lh3mxA5kZ34SWMa1ffGwmF9FjnmxMXsSpi6EyF2cXU_2cUiRLjx36W1VvIEFw/exec"

    fetch(route:string, data:any) {
        return new Promise<string>((res, rej) => {
            fetch(this.#sheet, {method:"post", body:JSON.stringify({route:route,data:data})}).
            then(r => r.text().then(t => {
                console.log(t)
                if (t.startsWith("OK")) {
                    res(t)
                } else if (t.startsWith("ERROR")) {
                    rej(t)
                }
            })).
            catch(rej)
        })
    }
}

