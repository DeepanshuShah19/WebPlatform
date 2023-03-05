let API_URL = "http://localhost:12230/"

export const handleLogin = async (emailId, password) => {
    console.log("In login function")
    const requestBody = JSON.stringify({
        emailid: emailId,
        password: password,
    });

    // console.log('stringified request: ', requestBody);

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
        let status;
        let details;
        await fetch(API_URL + "login", options)
            .then((res) => res.json())
            .then((data) => {
                status = data.status;
                details = data.details;
            });

        if (status === "ok") {
            return status;
        } else {
            return details;
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

    // console.log('stringified request: ', requestBody);

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
        let status;
        let details;
        await fetch(API_URL + "register", options)
            .then((res) => res.json())
            .then((data) => {
                status = data.status;
                details = data.details;
            });
        if (status === "ok") {
            return status;
        } else {
            return details;
        }
    } catch (err) {
        console.error('Error while getting all tasks.', err);
    }
    return null;
}