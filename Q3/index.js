const puppeteer = require('puppeteer')

async function scrape() {
    let keyWord = process.argv[2]
    let fund = []
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto('https://codequiz.azurewebsites.net/')
    const form = await page.$('body > input[type=button]');
    await form.evaluate(form => form.click());

    for(i = 2; i < 6; i++){
        var element = await page.waitForSelector(`body > table > tbody > tr:nth-child(${i})`)
        var text = await page.evaluate(element => element.innerHTML, element)
        let data = text.replace(/\s/g, '').split(/[</td>]+/)


        let res = data.filter((data) => {
            if (!(/\s/g).test(data)) { return data }
        })
        let json = {FundName:res[0],Nav:res[1],Bid:res[2],Offer:res[3],Change:res[4]}
        fund.push(json)
    }

    let search = fund.findIndex(({FundName}) => FundName == keyWord)

    // console.log(search)
    if(search != -1){
        console.log(fund[search].Nav)
    }else{
        console.log('find not found')
    }

    browser.close()
}
scrape()