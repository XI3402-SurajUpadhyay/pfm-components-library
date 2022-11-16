import axios from 'axios'
import { formatSunburstResponse } from '../response-adapter'
import { data, dataFormatForChart } from '../sample-payload'

export type FetchConfig = {
    endpoint: string,
    payload: Object
}

export const fetchSunburstChartData = ({
    endpoint, payload
}: FetchConfig) => {

    return new Promise( (resolve,reject) => {
        axios.post(endpoint,payload).then(res => {
            console.log(res);
            res.data.categoryName = 'All Tnx'
            resolve({
                data: formatSunburstResponse(res.data)
                // data: dataFormatForChart
            })
        }).catch(err => {
            reject(err)
        })
    } )
}