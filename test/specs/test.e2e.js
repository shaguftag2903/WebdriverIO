import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import WhatsNewPage from '../pageobjects/whatsNewPage.js'

import * as fs from 'fs';
let creds = JSON.parse(fs.readFileSync('test/testdata/LoginTest.json'))

describe('EComm Website', async() => {
    // this.retries(3)
    creds.forEach( ({invalidusername,invalidpassword})=>{
        it('E2E scenario invalid test - firstTest', async() => {
            // this.retries(3)
            await LoginPage.appUrl()
            console.log(await browser.getTitle())
            await expect(browser).toHaveTitleContaining("Home Page")

            await LoginPage.authSignIn.click()
            await expect(await LoginPage.customerLoginText).toBeDisplayed()
            await LoginPage.login(invalidusername,invalidpassword)
            await console.log(await LoginPage.errorLoginInfo.getText())
            await browser.pause(3000)
            await console.log("With GetText"+await LoginPage.notLoggedInInfo.getText())
            await expect(await LoginPage.notLoggedInInfo).toHaveTextContaining("Default welcome msg!")
            await browser.saveScreenshot("loginPage.png")
        })
    })

    creds.forEach( ({username,password,street,city,state,country,zipcode,phoneNum,rate})=>{
        it('E2E scenario order confirmation test', async() => {
            await LoginPage.appUrl()
            console.log(await browser.getTitle())
            await expect(browser).toHaveTitleContaining("Home Page")

            await LoginPage.authSignIn.click()
            await expect(await LoginPage.customerLoginText).toBeDisplayed()
            await expect(await LoginPage.notLoggedInInfo).toHaveTextContaining("Default welcome msg!")
        
            await LoginPage.login(username,password)
            await browser.pause(3000) 
            
            await expect(await WhatsNewPage.infoUserLogin).toHaveTextContaining("Welcome, Shagufta NG!")
            
            await WhatsNewPage.clickOnWhatsNew()
            await browser.pause(2000)
            // await WhatsNewPage.verifyWhatsNewHeader.isDisplayed()
            // await expect(await WhatsNewPage.whatsNewHeader.getText()).toHaveTextContaining("What's New")

            await WhatsNewPage.clickOnTeesSection()
            await browser.pause(3000)
            console.log(await WhatsNewPage.filterOptions.isDisplayed())
            await expect(browser).toHaveTitleContaining("Tees")
            await browser.pause(2000)

            // await WhatsNewPage.selectItemAndCheckout()

            await WhatsNewPage.selectSize.click()
            await WhatsNewPage.selectColor.click()
            await WhatsNewPage.btnAddToCart.click()
            await WhatsNewPage.iconCart.click()
            await browser.pause(2000)
            await WhatsNewPage.btnCartCheckout.click()
            await browser.pause(2000)

            await browser.pause(5000)
            await browser.saveScreenshot("beforeAdd.png")
            await WhatsNewPage.fillAddress(street,city,state,country,zipcode,phoneNum)
            await browser.saveScreenshot("afterAddress.png")
            await WhatsNewPage.selectShippingAndNext(rate)
            await browser.saveScreenshot("completeAddress.png")
            await browser.pause(3000)

            await browser.saveScreenshot("paymentPage.png")
            // await WhatsNewPage.checkboxAddress.click()
            await WhatsNewPage.btnPlaceOrder.click()
            await browser.saveScreenshot("confirmationPage.png")
            await browser.pause(3000)
        })
    })
})

