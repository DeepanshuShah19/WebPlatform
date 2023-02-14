let API_URL = ""

export const handleLogin = async (emailid, password) => {
    console.log("In getAllTasks function")
    const requestBody = {
        // 'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    }; 

    try {
        let response = await fetch(API_URL + "login", options);
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