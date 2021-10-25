const utils = {}

/**
 * @desc 将内容复制到剪切板
 * @param {string} str 要复制的字符串内容
 * @return {promise} 是否成功的promise
 */
utils.copyToClipboard = (str) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(str).then(res => {
      resolve(true)
    }).catch(error => {
      reject(error)
    })
  })
}

export { utils }
