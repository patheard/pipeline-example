// Behavioural tests for index.html
const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: [`--no-sandbox`]
  });
  page = await browser.newPage();
});
afterAll(() => {
  browser.close();
});

describe('Find Government of Canada services', () => {
  test('When I load the "Find a service" page, then I expect that the title is "Find a service - Canada.ca"', async () => {
    await page.goto('http://localhost:8080/');
    await page.waitForSelector('head > title');
    expect(await page.$eval('head > title', title => title.innerHTML)).toBe('Find a service - Canada.ca');
  }, 16000);

  test('When I load the "Find a service" page, then I don\'t expect any search results to be visible', async () => {
    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#search');
    expect(await page.$('#results .icon-link')).toBe(null);
  }, 16000);

  test('When I search for a "passport" service, then I expect that element "#results h2" contains the text "Services found: 2"', async () => {
    await page.goto('http://localhost:8080/');
    await page.waitForSelector('#search');
    await page.type('#search', 'passport');
    await page.waitForSelector('#results .icon-link');
    await page.waitFor(1000); // give the request a second to re-render
    expect(await page.$eval('#results h2', text => text.innerHTML)).toBe('Services found: 2');
    await page.screenshot({path: 'test/results/services-search.feature.test.png'});
  });
});