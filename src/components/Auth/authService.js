import axios from "axios"
import { productionUrl } from "variables/config.js";
class AuthService {
  login = async (email, pass) => {
    const body = {
      email: email,
      password: pass
    };
    //const data = 
    await axios.post(productionUrl + "/user/login", body)
      .then((response) => {
        console.log(response.data.data.name)
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response.data.data.id,
            user: response.data.data.name,
            token: response.data.access_token            
          })
        );
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.data.data.permissions)
        );
       return true
      })
      .catch(function (error) {
        localStorage.setItem(
          "user",
        )
        if (error.response) {
          return false
        }
      });
  };

  logout() {
    localStorage.removeItem("user");
  }

  register = async (user, pass, email) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user,
        email: pass,
        password: email,
      }),
    };
    const data = await fetch(`${productionUrl}/user/register`, requestOptions);
    console.log(data)

  };

  getCurrent() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();