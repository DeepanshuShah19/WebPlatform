let API_URL = "http://localhost:12230/"

export const handleLogin = async (emailid, password) => {
    console.log("In login function")
    const requestBody = JSON.stringify({
        emailid,
        password
    });

    console.log('stringified request: ', requestBody);

    const options = {
        method: "POST",
        mode: 'no-cors',
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    }; 

    try {
        let response = await fetch("http://localhost:12230/login", options);
        let json = await response.json();
        // return json;
        if (json.status === "ok") {
            return json.data;
        }
    } catch (err) {
        console.error('Error while getting all tasks.', err);
    }
    return null;
}

export const handleRegistration = async (emailid, password) => {

}