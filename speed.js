const {Builder, By} = require('selenium-webdriver');

const nets = [
    {
        'url': 'https://www.dotcom-tools.com/website-speed-test.aspx'
    },
    {
        'url': 'https://gtmetrix.com/',
        'input': '[name=url]',
        'click': '[class~=analyze-form-button]'
    },
    {
        'url': 'https://tools.pingdom.com/',
        'input': '[id=urlInput]',
        'click': '[class~=test-button]'
    },
    {
        'url': 'https://developers.google.com/speed/pagespeed/insights/',
        'input': '[name=url]',
        'click': '[class~=analyze]'
    }
];

async function test_speed(url, net) {
    let driver = await new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();

    try {
        await driver.get(net.url);
        if (net.input) {
            await driver.findElement(By.css(net.input)).sendKeys(url); 
            await driver.findElement(By.css(net.click)).click();
        }
    } catch (err) {
        console.log(err);
    } finally {
        setTimeout(() => {
            console.log(`${net.url} Over!!!`);
            driver.close();
        }, 1000 * 60 * close)
    }
}

const url = process.argv[2];
if (url) {
    const close = process.argv[3] || 3;
    if (url) {
        console.log(`${close}分钟后自动退出！`);
        nets.map(net => test_speed(url, net));
    }	
} else {
    console.log('缺少url');
}