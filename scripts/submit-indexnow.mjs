import { routes, isIndexableRoute } from '../src/data/seo.js'
import {
  indexNowHost,
  indexNowKey,
  indexNowKeyLocation,
} from '../src/data/indexnow.js'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const POLL_ATTEMPTS = 18
const POLL_MS = 10_000

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForKey() {
  for (let attempt = 1; attempt <= POLL_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch(indexNowKeyLocation, { cache: 'no-store' })
      const text = (await res.text()).trim()
      if (res.ok && text === indexNowKey) {
        console.log(`IndexNow key file live (attempt ${attempt})`)
        return
      }
      console.log(
        `Waiting for key file (status ${res.status}, attempt ${attempt}/${POLL_ATTEMPTS})`,
      )
    } catch (err) {
      console.log(
        `Waiting for key file (${err.message}, attempt ${attempt}/${POLL_ATTEMPTS})`,
      )
    }
    await sleep(POLL_MS)
  }
  console.error(`IndexNow key file not live at ${indexNowKeyLocation}`)
  process.exit(1)
}

async function submit() {
  const urlList = routes.filter(isIndexableRoute).map((route) => route.canonical)
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: indexNowHost,
      key: indexNowKey,
      keyLocation: indexNowKeyLocation,
      urlList,
    }),
  })
  const text = await res.text()

  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow submitted ${urlList.length} URLs (${res.status})`)
    return
  }
  if (res.status === 429) {
    console.warn(`IndexNow rate limited (429); skipping. ${text}`)
    return
  }

  console.error(`IndexNow failed (${res.status}): ${text}`)
  process.exit(1)
}

await waitForKey()
await submit()
