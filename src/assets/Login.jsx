import { Cookies } from "react-cookie";
import "../Login.css";
import axios from "axios";

const cookies = new Cookies(document.cookie);
export default function Login() {
    async function handleSubmit(e) {
        e.preventDefault();
        let jsonObject = Object.fromEntries(new FormData(e.target).entries()); 
        let result = await axios.post("http://localhost:8080/api/user/login", jsonObject);
        cookies.set("Api-Login", result.data.token);
        location.assign("/");
    }
    return (<div id="context-login-wrapper">
        <form id="login-form" onSubmit={handleSubmit}>
            <h2 id="form-header">Inloggen</h2>
            <p>
                <input type="text" name="username" id="username" placeholder="Gebruikersnaam" />
            </p>
            <p>
                <input type="password" name="password" id="password" placeholder="Wachtwoord" />
            </p>
            <p className="right">
                <button id="btn-login">Inloggen</button>
            </p>
        </form>
    </div>);
}