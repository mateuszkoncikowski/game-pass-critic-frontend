const puppeteer = require('puppeteer')

export async function getGameScore(gameIds) {
  let scores = []
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  for (let i = 0; i < gameIds.length; i++) {
    const metaCriticUrl = `https://www.metacritic.com/game/pc/${gameIds[i].metaCritic}`
    try {
      const page = await browser.newPage()
      await page.goto(metaCriticUrl, {
        waitUntil: 'load',
        timeout: 0,
      })
      const element = await page.$('.main_details .metascore_w')
      const value = await page.evaluate((el) => el.textContent, element)
      scores.push({ ...gameIds[i], score: value })
    } catch (error) {
      console.log('Issue with Metacritic game fetching', gameIds[i].title)
      console.log('Error from Puppeteer:', error)
      scores.push({ ...gameIds[i], score: 'N/A' })
    }
  }
  await browser.close()
  return scores
}
