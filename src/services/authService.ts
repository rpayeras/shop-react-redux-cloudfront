export const login = () => {
  console.log("Doing login...");

  if (!localStorage.getItem("authorization_token")) {
    localStorage.setItem(
      "authorization_token",
      btoa(`rpayeras:${process.env.REACT_APP_AUTH_PASSWORD}`)
    );
  }
};
