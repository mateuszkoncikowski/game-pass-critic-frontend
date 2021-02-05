const puppeteer = require('puppeteer')

export async function getGameTimeToBeat(gameIds) {
  let scores = []
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  // console.log(browser)
  for (let i = 0; i < gameIds.length; i++) {
    const URL = `https://howlongtobeat.com/game?id=${gameIds[i].howLongToBeat}`
    const page = await browser.newPage()
    await page.goto(URL, {
      waitUntil: 'load',
      timeout: 0,
    })
    const element = await page.$('.game_times li div')
    const value = await page.evaluate((el) => el.textContent, element)
    scores.push({ ...gameIds[i], timeToBeat: value })
  }
  await browser.close()
  return scores
}
