const puppeteer = require('puppeteer')

export async function getGameScore(gameIds) {
  let scores = []
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  for (let i = 0; i < gameIds.length; i++) {
    const URL = `https://www.metacritic.com/game/pc/${gameIds[i].metaCritic}`
    const page = await browser.newPage()
    await page.goto(URL, {
      waitUntil: 'load',
      timeout: 0,
    })
    const element = await page.$('.main_details .metascore_w')
    const value = await page.evaluate((el) => el.textContent, element)
    scores.push({ ...gameIds[i], score: value })
  }
  await browser.close()
  return scores
}
