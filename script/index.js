/*
 * @LastEditTime: 2024-08-04 17:53:44
 * @Description: ...
 * @Date: 2024-08-01 22:16:50
 * @Author: isboyjc
 * @LastEditors: isboyjc
 */
const axios = require('axios');
const { parse } = require('./parse')
const { BASE_URL } = require('./base')
const { save } = require('./save')

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Host': 'github.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  }
});

async function run (since = 'daily', language = 'all') {
  let reqPath = `/trending${language == 'all' ? '' : ('/' + language)}`
  if(since !== 'daily') reqPath += `?since=${since}`

  // console.log('get', reqPath)
  const { data } = await instance.get(reqPath);
  // console.log('done')

  await save(parse(data), since, language)
};

async function fetchRequiredTrending(fetchTrending = run) {
  console.log('get', 'all')
  await fetchTrending('daily', 'all')
  await fetchTrending('weekly', 'all')
  console.log('done')
}

if (require.main === module) {
  fetchRequiredTrending().catch(error => {
    console.error('Error fetching required trending data:', error)
    process.exitCode = 1
  })
}

module.exports = {
  fetchRequiredTrending,
  run
}
