export {connectPlug}

async function connectPlug (){
    try {
        // const publicKey = await window.ic.plug.requestConnect();
        console.log("Connect to plug wallet successfully");
        
        //   console.log(`The connected user's public key is:`, publicKey);
    } catch (e) {
        console.log(e);
    }
}