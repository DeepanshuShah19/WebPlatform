let API_URL = "http://localhost:12230/"

export const handleLogin = async (emailId, password) => {
    console.log("In login function")
    const requestBody = JSON.stringify({
        emailId,
        password,
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

export const handleRegistration = async (name, emailId, password, phoneNumber) => {
    console.log("In register function")
    const requestBody = JSON.stringify({
        name: name,
        emailid: emailId,
        password: password,
        phoneNumber: phoneNumber
    });

    console.log('stringified request: ', requestBody);

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: requestBody
    };

    try {
        debugger;
        let response = await fetch(API_URL + "register", options).then((res) => res.json())
            .then((data) => {
                console.log("userRegistered ", data)
            });
        if (response.status == "ok") {
            return response;
        }
    } catch (err) {
        console.error('Error while getting all tasks.', err);
    }
    return null;
}