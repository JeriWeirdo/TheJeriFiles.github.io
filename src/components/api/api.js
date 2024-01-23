import axios from "axios";
const api = axios.create({
    baseURL: "http://cardsjson.vercel.app/"
})
export default api