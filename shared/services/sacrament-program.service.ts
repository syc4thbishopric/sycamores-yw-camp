import { config } from "../../config"

const { apiUrl, apiWard, apiHeaders } = config

/**
 * REQUESTS
 */
export const sacramentProgramRequest = () => new Request(`${apiUrl}/agenda/${apiWard}`, apiHeaders)
