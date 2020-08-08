import glob from 'glob'

async function scanFiles(pattern: string) {
    const p = new Promise((resolve, reject) => {
        glob(pattern, (err, files) => {
            if (err) {
                reject(err)
            }

            resolve(files)
        })
    })

    return p
}

export {scanFiles}