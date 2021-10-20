import Axios from "axios"

export const AxiosPali = Axios.create({
  baseURL: "http://localhost:3000/"
})