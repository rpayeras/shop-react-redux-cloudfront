export const checkLogin = () => {
  console.log("Checking login...");
  const urlParams = new URLSearchParams(window.location.href.split("#")[1]);
  console.log(urlParams);

  if (urlParams.has("id_token")) {
    const cognitoToken = urlParams.get("id_token") || "";

    localStorage.setItem("cognito_token", cognitoToken);
    console.log("Cognito token saved: ", cognitoToken);
  }

  if (!localStorage.getItem("authorization_token")) {
    localStorage.setItem(
      "authorization_token",
      btoa(`rpayeras:${process.env.REACT_APP_AUTH_PASSWORD}`)
    );
  }

  if (!localStorage.getItem("cognito_token")) {
    return false;
  }

  return true;
};

export const removeAuthData = () => {
  localStorage.removeItem("cognito_token");
  localStorage.removeItem("authorization_token");
};
