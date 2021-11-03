import Axios from "axios"

export const AxiosPali = Axios.create({
  baseURL: process.env.PALI_HOST
})