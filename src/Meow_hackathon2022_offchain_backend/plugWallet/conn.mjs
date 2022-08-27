export {connectPlug}

async function connectPlug (){
    try {
        const publicKey = await window.ic.plug.requestConnect();
        console.log("Connect to plug wallet successfully");
    } catch (e) {
        console.log(e);
    }
}