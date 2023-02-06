const moment = require("moment");
const { errorMsg } = require('../helper/messages')
const { _GET_CSV_FROM_FTP_USING_ASYNC } = require('../helper/ftpService')

const getFormatedDate = string => {
    /** There are two types of date format(MM/DD/YYYY or YYYY/MM/DD)
    * So convert both to in a single format (M/D/YYYY)
    * Split by '/' and get last element from array
    * If last element length is 4 format is (MM/DD/YYYY) but if 2 then format is (YYYY/MM/DD)
    */
    if (!string) return null

    const lastElementLength = string?.split('/').pop().length
    const foundDateFormat = lastElementLength === 4 ? 'MM/DD/YYYY' : 'YYYY/MM/DD'
    const formatedDate = moment(string, foundDateFormat).format('M/D/YYYY') // Formatting all date to a common date format
    return formatedDate
}

const getCurrentShiftingHour = () => {
    const currentHour = parseInt(moment().format("HH"))
    if (currentHour >= 6 && currentHour < 14) {
        return { shift_name: 'A', start_hour: 6, end_hour: 13, shift_time: '6:00:00 AM - 2:00:00 PM' }
    } else if (currentHour >= 14 && currentHour < 22) {
        return { shift_name: 'B', start_hour: 14, end_hour: 21, shift_time: '2:00:00 PM - 10:00:00 PM' }
    } else if (currentHour >= 22 || currentHour < 6) {
        return { shift_name: 'C', start_hour: 22, end_hour: 5, shift_time: '10:00:00 PM - 6:00:00 AM' }
    }
}

var csvFiles = [
    {
        file_name: 'I_SHIFTPRD',
        file_path: '/I_SHIFTPRD.CSV'
    }
]

var credentails = {
    user: "anonymous",
    password: "tccs",
    connTimeout: 1000
}

exports.SINGLE_REQUEST = async (req, res) => {

    const currentDate = moment(new Date(), 'MM/DD/YYYY').format('M/D/YYYY');
    const currentShift = getCurrentShiftingHour();

    try {

        let machineList = []
        const serverIP = []

        for (let i = 0; i < 64; i++) {
            serverIP.push(
                { ip: `172.16.1.${i}`, machine_no: i + 1 }
            )
        }

        for (const server of serverIP) {
            for (const file of csvFiles) {
                let machineData = null;
                if (server.ip) {
                    machineData = await _GET_CSV_FROM_FTP_USING_ASYNC(credentails, server.ip, file.file_path)
                }
                const formatedData = machineData?.map(item => {
                    return {
                        shift_no: item['field2'],
                        production_date: getFormatedDate(item['field1']),
                        production_time: item['field5'],
                        rpm: item['field7'],
                        production_qty: item['field10'],
                    }
                })
                    ?.map(item => { // Parsing data
                        return {
                            ...item,
                            production_date_time: item.production_date + ' ' + item.production_time,
                            production_hour: parseInt(moment(item.production_time, 'HH:mm:ss').format("HH")),
                            rpm: parseInt(item.rpm) || 0,
                            production_qty: parseInt(item.production_qty) || 0,
                        }
                    })

                const filteredData = formatedData?.filter(item => { // Filter Data (Current data and current shift)
                    return (item.production_date == currentDate
                        && item.production_hour >= currentShift.start_hour
                        && item.production_hour <= currentShift.end_hour
                    )
                })

                const finalResult = filteredData?.map(item => { // Calculations
                    return {
                        ...item,
                        efficiency: parseInt(((item.production_qty / item.rpm) * 100) / (480 / 100))
                    }
                })

                machineList.push({
                    machine_no: server.machine_no,
                    ...finalResult?.[0],
                })
            }
        }

        res.status(200).json({
            current_date: currentDate,
            shift_time: currentShift.shift_time,
            shift_name: currentShift.shift_name,
            machineList: machineList
        })
    } catch (error) {
        console.log('top error =>', error)
        res.status(500).json(errorMsg).end()
    }
}