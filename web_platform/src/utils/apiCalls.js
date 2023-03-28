let API_URL = "http://localhost:12230/";

export const handleLogin = async (emailId, password) => {
  console.log("In login function");
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
    body: requestBody,
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
    console.error("Error while getting all tasks.", err);
  }
  return null;
};

export const handleRegistration = async (
  name,
  emailId,
  password,
  phoneNumber
) => {
  console.log("In register function");
  const requestBody = JSON.stringify({
    name: name,
    emailid: emailId,
    password: password,
    phoneNumber: phoneNumber,
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
    body: requestBody,
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
    console.error("Error while getting all tasks.", err);
  }
  return null;
};

export const handleGoogleLogin = async (userDetails) => {
  console.log("In Google login function");
  const requestBody = JSON.stringify({
    userDetails: userDetails,
  });

  const options = {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: requestBody,
  };

  try {
    let status;
    let details;
    await fetch(API_URL + "googleLogin", options)
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
    console.error("Error while getting all tasks.", err);
  }
  return null;
};

export const createMeeting = async (emailId, topic, time) => {
  console.log("In getbearerToken function");
  const requestBody = JSON.stringify({
    emailid: emailId,
    topic: topic,
    time: time,
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
    body: requestBody,
  };

  try {
    let status;
    let response;
    await fetch(API_URL + "createMeeting", options)
      .then((res) => res.json())
      .then((data) => {
        status = data.status;
        response = data.data;
      });

    return response;
  } catch (err) {
    console.error("Error while getting all tasks.", err);
  }
  return null;
};

export const saveMeeting = async ( emailId, topic, joinURL, startURL, meetingId, time, listOfAttendee) => {
  console.log("In saveMeeting function");
  console.log("List of Attendee: ", listOfAttendee);
  const requestBody = JSON.stringify({
    emailId: emailId,
    topic: topic,
    joinURL: joinURL,
    startURL: startURL,
    meetingId: meetingId,
    time: time,
    listOfAttendee: listOfAttendee
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
    body: requestBody,
  };

  try {
    let status;
    let details;
    await fetch(API_URL + "saveMeeting", options)
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
    console.error("Error while saving meeting.", err);
  }
  return null;
};

export const getUserMeetings = async (emailId) => {
  console.log("In getUserMeetings function");
  const requestBody = JSON.stringify({
    emailId: emailId,
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
    body: requestBody,
  };

  try {
    let status;
    let meetings;
    await fetch(API_URL + "getUserMeetings", options)
      .then((res) => res.json())
      .then((data) => {
        status = data.status;
        meetings = data.meetings;
      });
    if (status === "ok") {
      return meetings;
    } else {
      return meetings;
    }
  } catch (err) {
    console.error("Error while getting all tasks.", err);
  }
  return null;
};

export const deleteMeeting = async (meetingId) => {
  console.log("In deleteMeeting function");
  const requestBody = JSON.stringify({
    meetingId: meetingId,
  });
  console.log(requestBody);
  const options = {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: requestBody,
  };

  try {
    let status;
    await fetch(API_URL + "deleteMeeting", options)
      .then((res) => res.json())
      .then((data) => {
        status = data.status;
      });

    if (status === "ok") {
      //delete meeting from database
      let deleteStatus;
      await fetch(API_URL + "deleteMeetingFromDatabase", options)
        .then((res) => res.json())
        .then((data) => {
          deleteStatus = data.status;
        });
      if (deleteStatus === "ok") {
        console.log("Meeting Deleted from database");
        return deleteStatus;
      } else {
        console.log("Error while deleting meeting from database");
        return deleteStatus;
      }
    } else {
      return status;
    }
  } catch (err) {
    console.error("Error while getting all tasks.", err);
  }
  return null;
};

export const sendmail = async (attendee, emailId, joinURL, time) => {
  const requestBody = JSON.stringify({
    listOfAttendee: attendee,
    email: emailId,
    joinURL: joinURL,
    time: time
  });

  const options = {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: requestBody,
  };

  try {
    let status;
    let details;
    await fetch(API_URL + "sendMail", options)
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
    console.error("Error while saving meeting.", err);
  }
  return null;
};