// apps script client
export class ASClient {
    // HIDE ME EVENTUALLY
    asScriptUrl = "https://script.google.com/macros/s/AKfycbyEBnlc0riwBxhZaBhnDGSfYvWNTFVio2fB__STN8o50yqLKKo428hEhEcDaaNqfK3yOQ/exec"

    fetch(route:string, data:unknown) {
        return new Promise<string>((res, rej) => {
            fetch(this.asScriptUrl, {method:"post", body:JSON.stringify({route:route,data:data})}).
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

