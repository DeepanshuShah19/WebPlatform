import React, { useState } from "react";
import { Button } from "@mui/material";
import WebhookIcon from "@mui/icons-material/Webhook";
import "../styles/Register.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Grid from "@mui/material/Grid";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(phone);

    if (password1 !== password2) return alert("Password didn't match");

    try {
      console.log("Sending Request.....");
      let resp = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          password: password1,
          email: email,
          phone: phone,
          country: country,
          street: street,
          province: province,
          postalCode: postalCode,
        }),
      });
      if (resp.status === 200) {
        alert("User Registered Successfully");
      } else if (resp.status === 409) {
        alert("User Already Exists");
      } else {
        alert("User Registration Unsuccessfull");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="app__register">
      <div className="register_container">
        <div className="container_left">
          <form className="form" onSubmit={handleRegister} action="#">
            <label for="fullname">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label for="phone">Phone</label>
            <PhoneInput
              className="phoneInput"
              id="phone"
              country="CA"
              value={phone}
              onChange={(phone) => {
                setPhone(phone);
              }}
              required
            />

            <label for="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />

            <label for="street">Street</label>
            <br />
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
            />

            <label for="postCode">Postal Code</label>
            <br />
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
            />

            <label for="province">Province</label>
            <input
              type="text"
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Province"
            />

            <label for="password1">Password</label>
            <input
              id="password"
              minLength={8}
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <label for="password2">Confirm Password</label>
            <input
              id="password2"
              type="password"
              minLength={8}
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <Button type="submit" className="login__button" variant="contained">
              Register
            </Button>
          </form>
        </div>
        <div className="container_right">
          <WebhookIcon />
        </div>
      </div>
    </div>
  );
};

export default Register;
