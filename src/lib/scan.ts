import glob from 'glob'

async function scanFiles(pattern: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        glob(pattern, (err, files) => {
            if (err) {
                reject(err)
            }

            resolve(files)
        })
    })
}

export {scanFiles}