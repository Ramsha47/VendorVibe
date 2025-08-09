import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log("ActivationPage rendered", { success, error, activation_token });

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activate`, { activation_token })
          .then((res) => {
            console.log("Activation success", res);
            setSuccess(true);
          })
          .catch((err) => {
            console.log("Activation error", err);
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  if (success) {
    console.log("Success branch");
    return <div>Account activated successfully!</div>;
  }
  if (error) {
    console.log("Error branch");
    return <div>Activation failed or link expired.</div>;
  }
  console.log("Loading branch");
  return <div>Activating your account...</div>;
};

export default ActivationPage;