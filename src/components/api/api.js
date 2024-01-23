import axios from "axios";
const api = axios.create({
    baseURL: "https://cardsjson.vercel.app/"
})
export default api