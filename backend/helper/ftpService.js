const csv = require("csvtojson");

const _GET_CSV_FROM_FTP_USING_ASYNC = async (credentails, server_ip, file_path) => {
    const PromiseFtp = require('promise-ftp'), ftp = new PromiseFtp()

    try {
        await ftp.connect({ ...credentails, host: server_ip })

        console.log(`${server_ip} -> `, ftp.getConnectionStatus())

        const streamFile = await ftp.get(file_path)

        return new Promise((resolve, reject) => {
            var csvArray = []
            streamFile.pipe(csv({ noheader: true, trim: true }))
                .on('data', (row) => { // Calls for every row fetching
                    const csvRow = JSON.parse(row.toString('utf8')) // stream row -> string -> json (Store after converting)
                    csvArray.push(csvRow) // Making array
                })
                .on('end', () => { // Calls after finishing all rows fetch
                    resolve(csvArray)
                    ftp.end()
                    // console.log(`${server_ip} -> `, ftp.getConnectionStatus())
                })
                .on('error', (err) => {
                    reject(err)
                    ftp.end() // Error while file reading
                })
        })
    } catch (error) {
        ftp.end() // Connection error or any kind of error
        console.log(`${server_ip} SERVER ERROR ->`, error)
        console.log(`${server_ip} -> `, ftp.getConnectionStatus())
    }
}

module.exports = {
    _GET_CSV_FROM_FTP_USING_ASYNC,
}