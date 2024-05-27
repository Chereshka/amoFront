
import config from "@/config";
import axios from "axios";


const http = axios.create({
    baseURL: config.baseUrl
});




export const fetchLeads = async (query?: string) => http.get(!!query?.length ? `/leads?query=${query}` : '/leads')
