export interface GetDataInterface {
    isArray: boolean; // Returning list array or detail object
    url: string; // API path to get '/v2/classes/XXXX'
    query?: boolean; // For oreder item by
    key?: any; // Querying key 'idclass'
    value?: any; // Item if has value 'CLS12345'
}
export interface WriteDataInterface {
    url: string; // API path to write '/v2/classes/XXXX'
    isShowAlert: boolean; // Showing alert if data sucessfully saved
    type: string; // Write data and can sating as [set|update]
    value: any; // Value will write
}
