const assert = require('node:assert/strict')
const test = require('node:test')

const { fetchRequiredTrending } = require('../script/index')

test('只抓取 daily/all 和 weekly/all', async () => {
  const calls = []

  await fetchRequiredTrending(async (since, language) => {
    calls.push([since, language])
  })

  assert.deepEqual(calls, [
    ['daily', 'all'],
    ['weekly', 'all']
  ])
})
