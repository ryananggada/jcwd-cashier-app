import axios from "axios"
import { PORT } from "../backend/index"

const api = axios.create({
    baseURL: `http://localhost:${PORT}`
})

export default api