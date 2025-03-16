// apps script client
export class ASClient {
    // HIDE ME EVENTUALLY
    #sheet = "https://script.google.com/macros/s/AKfycbyaloCXhlk1lK5oluMsO0rjcIBYRcP-cB-SuNWo46oOlX7H-4NrJIJwGCHm3Xf-bdl14A/exec"

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

