const puppeteer = require('puppeteer-extra');
const fetch = require('node-fetch');
const request = require('request');
const axios = require('axios');
const { convert } = require('html-to-text');
const cheerio = require('cheerio');
const fs = require('fs');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
var readlineSync = require('readline-sync');

const sleep = ms => new Promise(res => setTimeout(res, ms));
const password = "Anjing404!";
var {
    random,randlast
} = require('./names.js');

var ascii = fs.readFileSync('ascii.txt',{encoding: 'utf-8'});
console.log(ascii);

// VAR DATE

let day = "12";
let month = "11";
let tahun = "1990";
const nomor = Math.floor(Math.random() * 200);

// VAR BILLING
const bin = "543897"
const acak = Math.floor(Math.random() * 2391839128) + 2893478237;
const vcc = "555"
var ends = ['2025', '2026', '2027']; 
var rand = ends[(Math.random() * ends.length) | 0]
const cc = bin+acak;

// VAR ADDRESS

const addr1 = 'Jl Wijaya II Wijaya Graha Puri';
const addr2 = 'Blok B1/G23';
const addr3 = 'Jakarta';
const addr4 = '12160';
const addr5 = '+628';
const addr6 = ''

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({
    blocktrackers: true
}));

const emailInfo = random();
const lastInfo = randlast();


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-notifications'
        ]
    });
    await sleep(1000, console.log('\n'));
    let allPage = await browser.pages();
    const page = await allPage[0];
    

    await page.goto('https://music.apple.com/includes/commerce/account/create/personal', {
        waitUntil: 'networkidle2',
    });
    

    const pageTwo = await browser.newPage()

    await pageTwo.goto('https://mailnesia.com/mailbox/' + emailInfo + nomor)
    
    await page.bringToFront()
    

    await sleep (3000, console.log("Mencoba Loading URL..."))

    await page.setViewport({ width: 1280, height: 720})

    await page.waitForSelector('#firstName')
    await page.click('#firstName')
    await page.keyboard.type(emailInfo)
    await sleep(1000)
    await page.waitForSelector('#lastName')
    await page.click('#lastName')
    await page.keyboard.type(lastInfo)
    await sleep(1500)
    await page.waitForSelector('#birthday')
    await page.focus('#birthday')
    await page.keyboard.type(day , {delay: 20});
    await sleep(3000)
    await page.keyboard.type(month , {delay: 20});
    await sleep(2000)
    await page.keyboard.type("1990" , {delay: 20});
    await sleep(1000)
    await page.waitForSelector('#email')
    await page.click('#email')
    await page.keyboard.type(emailInfo + nomor + "@mailnesia.com");
    await sleep(1000)
    await page.waitForSelector('#acAccountPassword')
    await page.click('#acAccountPassword')
    await page.keyboard.type(password)
    await sleep(1000, console.log("=> Membuat akun dengan Username : " + emailInfo + nomor + "@mailnesia.com|" + password))
    await page.waitForSelector('#agreedToTerms')
    await page.click('#agreedToTerms')
    await sleep(1000)
    await page.waitForSelector('.account-base__content > .create-account > .create-account__form > .form-buttons > .web-button-form')
    await page.click('.account-base__content > .create-account > .create-account__form > .form-buttons > .web-button-form')
    await sleep(1000)
    await sleep(1000)
    await pageTwo.bringToFront()
    await sleep(9000)
    await pageTwo.evaluate(() => {
        location.reload(true)
     })
    await sleep(4000)
    const scrapping = 'https://mailnesia.com/mailbox/' + emailInfo + nomor;
    const defUrl = 'https://mailnesia.com'
    console.log(scrapping)
    const getProduct = () => new Promise((resolve,reject) => {
        fetch(scrapping, {
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36'
            }
    }) 
    
        .then (res => res.text())
        .then(result => {
            const $ = cheerio.load(result);
            let anchorElem = $("a[class='email']");
            let link = anchorElem.attr("href");     
            console.log("=> Mencoba Membuka Inbox : ")   
            resolve(link)
            
        })
        .catch(err => reject(err))
    
    });
            const detailPrice = await getProduct()
            console.log("=> Berhasil Mengambil Inbox Mail :")
            console.log(detailPrice)
            const resultUrl = defUrl + detailPrice;
            await pageTwo.goto(resultUrl)
            
            // GET OTP APPLE

            const getOtp = () => new Promise((resolve,reject) => {
                fetch(resultUrl, {
                    method: 'GET',
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36'
                    }
            })
            
            
                .then (res => res.text())
                .then(result => {
                    const $ = cheerio.load(result);
                    const menu = $('#main > div.container > div > div > p > b').text();
                    console.log("=> OTP Apple : ")
                    resolve(menu)
                    
                })
                .catch(err => reject(err))
            
            });

                    const detailOtp = await getOtp()
                    console.log(detailOtp)
                    await page.bringToFront()
                    await page.waitForSelector('#secretCode')
                    await page.click('#secretCode')
                    await page.keyboard.type(detailOtp)
                    await page.waitForSelector('#app > div > div > div > main > div.account-base__content > div > form > div.form-buttons > button.web-button-form.form-button.web-button-form--primary.form-buttons__continue.form-buttons__button')
                    await page.click('#app > div > div > div > main > div.account-base__content > div > form > div.form-buttons > button.web-button-form.form-button.web-button-form--primary.form-buttons__continue.form-buttons__button')
                    await sleep(2000, console.log("=> Mengisi data field address & billing info... "))
                    await page.waitForSelector('#creditCardNumber')
                    await page.click('#creditCardNumber')
                    await page.type('input[id=creditCardNumber]', cc, { delay: 200 })
                    await sleep(3000)
                    await page.waitForSelector('#expiration')
                    await page.click('#expiration')
                    await sleep(2000)
                    await page.keyboard.type("1" , { delay: 100 })
                    await sleep(2000)
                    await page.keyboard.type("2" , { delay: 100 })
                    await page.keyboard.type(rand , { delay: 100 })
                    await page.waitForSelector('#creditVerificationNumber')
                    await page.click('#creditVerificationNumber')
                    await page.keyboard.type(vcc)
                    await page.waitForSelector('#addressOfficialLineFirst')
                    await page.click('#addressOfficialLineFirst')
                    await page.keyboard.type(addr1)
                    await page.waitForSelector('#addressOfficialLineSecond')
                    await page.click('#addressOfficialLineSecond')
                    await page.keyboard.type(addr2)
                    await page.waitForSelector('#addressOfficialCity')
                    await page.click('#addressOfficialCity')
                    await page.keyboard.type(addr3)
                    await sleep(1000)
                    await page.click('select[name="addressOfficialStateProvince"]');
                    await sleep(1000)
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('ArrowDown');
                    await page.keyboard.press('Enter');
                    await page.waitForSelector('#addressOfficialPostalCode')
                    await page.click('#addressOfficialPostalCode')
                    await page.keyboard.type(addr4)
                    await page.waitForSelector('#phoneOfficeAreaCode')
                    await page.click('#phoneOfficeAreaCode')
                    await page.keyboard.type(addr5)
                    await page.waitForSelector('#phoneOfficeNumber')
                    await page.click('#phoneOfficeNumber')
                    await page.keyboard.type(JSON.stringify(acak));
                    await page.waitForSelector('#app > div > div > div > main > div.account-base__content > div > form > div.form-buttons.create-billing__navigation-buttons > button.web-button-form.form-button.web-button-form--primary.form-buttons__continue.form-buttons__button')
                    await page.click('#app > div > div > div > main > div.account-base__content > div > form > div.form-buttons.create-billing__navigation-buttons > button.web-button-form.form-button.web-button-form--primary.form-buttons__continue.form-buttons__button')
                    await sleep(10000) 
                    await page.goto('https://appleid.apple.com/')
                    
                    


            })();

