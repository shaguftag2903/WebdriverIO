import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const expectChai = require('chai').expect
describe('My first Test Application',  async()=>
{
    xit('Test Login Pass', async()=>{
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/")
        console.log(await browser.getTitle())
        await expect(browser).toHaveTitleContaining("Shetty")

        await $("#username").setValue("rahulshettyacademy")
        const pwd = $("#password")
        await pwd.setValue("learning")

        const radioBtn = await $$(".radiotextsty")
        const userDD = radioBtn[1]
        await userDD.click()

        // await $$(".customradio")[1].$(".span").click()

        const popUp = await $(".modal-body")
        await popUp.waitForDisplayed()    
        await $("#okayBtn").click()

        //for dropdown
        // const selectDD = $("//select")
        // await selectDD.click()

        // const selectOption = $("option[value='teach']")
        // await console.log(await selectOption.getText())
        // await selectOption.click()

        const selectDD = await $("select.form-control")
        selectDD.selectByAttribute('value','teach')
        await browser.pause(3000)
        selectDD.selectByVisibleText("Consultant")
        await browser.pause(3000)
        selectDD.selectByIndex(1)
        await browser.pause(3000)
        const value = await selectDD.getText()
        // await expect(value.includes("Madam"))
        // expect(await selectDD.getValue()).to.equal("teach")  //chai assertion using import

        await browser.pause(3000)


        await $("#signInBtn").click()
        const checkoutTxt = $("//a[contains(text(),'Checkout')]")
        await checkoutTxt.waitForDisplayed()

    })

    xit('Dynamic dropdown handle', async()=>{
        
        await browser.url("https://rahulshettyacademy.com/AutomationPractice/")
        await browser.pause(3000)

        const autoSugg = $("#autocomplete")
        await autoSugg.click()
        await autoSugg.setValue("Ind")
        await browser.pause(3000)
        let country = await $$("[class='ui-menu-item'] div")
        for(var i=0;i<await country.length;i++)
        {
            const value = await country[i].getText()
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+value)
            if(await value === "India"){
                await country[i].click()
                break;
            }
        } await browser.pause(3000)

        //handling checkbox
        const chckbx  = $$("input[type='checkbox']")
        for(var i=0;i<await chckbx.length;i++){
            console.log(await chckbx[i].getText())
        }
        await chckbx[1].click()
        console.log("************************"+await chckbx[1].isSelected())
        await browser.saveScreenshot("chckbxScreensht1.png")

    })

    xit('Scrolling and Mouse Hover', async()=>{
        await browser.url("https://rahulshettyacademy.com/AutomationPractice/")
        await $("#mousehover").scrollIntoView()
        await browser.pause(3000)
        await browser.saveScreenshot("scrollView.png")
        await $("#mousehover").moveTo()
        await browser.pause(3000)
        const topHover = $("//a[contains(text(),'Top')]")
        await topHover.click()
        await browser.pause(3000)
        await browser.saveScreenshot("scrollViewTop.png")
    })

    xit("Javascript alert handling",async()=>{
        await browser.url("https://only-testing-blog.blogspot.com/2014/09")
        // await browser.pause(3000)
        await $("button").doubleClick()
        await browser.saveScreenshot("alertOpen.png")
        console.log(await browser.isAlertOpen())
        expectChai(await browser.isAlertOpen()).to.be.true
        expectChai(await browser.getAlertText().to.equal("You double clicked me.. Thank You.."))
        await browser.acceptAlert()
        await browser.pause(2000)
    })

    xit("Sorting",async()=>{
        await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        await browser.pause(3000)
        const tableHeader = await $("tr th:nth-child(1)")
        await tableHeader.click()
        const tableContent = await $$("tr td:nth-child(1)")
        console.log("tableContent:"+tableContent)
        const allData = await tableContent.map(async veggies=>await veggies.getText())
        console.log("Data before sort:"+ allData)
        const beforeSort = allData.slice()
        console.log("Before sort data:"+beforeSort)

        const afterSort = beforeSort.sort()
        console.log("After sort data:"+afterSort)

        expectChai(allData).to.eql(afterSort)
        await browser.pause(2000)
    })

    xit("Sort without async", ()=>{
        browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        browser.pause(3000)
        const tableHeader =  $("tr th:nth-child(1)")
        tableHeader.click()

        const vegLocators =  $$("tr td:nth-child(1)")
        const vegNames =  vegLocators.map(veggies=> veggies.getText())
        console.log("Data before sort:"+ vegNames)
        const beforeSort = vegNames.slice()
        afterSort = beforeSort.sort()
        console.log("After sort data:"+afterSort)

        expectChai(vegNames).to.eql(afterSort)
        browser.pause(2000)
    })

    xit("Search content", async()=>{
        await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        await browser.pause(3000)
        const searchTxt = await $("#search-field")
        await searchTxt.click()
        await searchTxt.setValue("Tomato")
        const firstSearchResult = await $("tr td:nth-child(1)")
        console.log(await firstSearchResult.getText())
        expect(await firstSearchResult.getText()).toEqual("Tomy")
        await browser.pause(3000)        
    })

    xit("Window Handle", async()=>{
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/")
        await browser.pause(3000)
        await $(".blinkingText").click()
        await browser.pause(3000)
        const handle = await browser.getWindowHandles()
        await browser.switchToWindow(handle[1])
        const docHeader = $("h1")
        console.log(await docHeader.getText())
        await expect(await docHeader.getText()).toEqual("DOCUMENTS REQUEST")
        await browser.closeWindow()
        await browser.switchToWindow(handle[0])
        const tnc = await $("//span[@class='text-white termsText']")
        console.log(await tnc.getText())
    })

    xit("New Tab, New Window, Alert accept/dismiss", async()=>{
        await browser.url("https://rahulshettyacademy.com/AutomationPractice/")
        await browser.pause(3000)
        const opnWdo = await $("#openwindow")
        await opnWdo.click()
        await browser.pause(3000)
        const handl =await browser.getWindowHandles()
        await browser.switchToWindow(handl[1])
        console.log(await browser.getTitle())
        await browser.pause(3000)
        const newUR = await browser.getUrl()
        console.log("Current URL:"+await newUR)
        await expect(await newUR).toEqual("http://www.qaclickacademy.com/")
        await browser.closeWindow()
        await browser.switchToWindow(handl[0])
        const alertName = await $("#name")
        await alertName.click()
        await alertName.setValue("hello")
        const alrtBtn = await $("#alertbtn")
        await alrtBtn.click()
        console.log("ALert Text = :"+await browser.getAlertText())
        await browser.acceptAlert()
        await $("#confirmbtn").click()
        console.log("COnfirm alert Text = "+await browser.getAlertText())
        await browser.dismissAlert()
        await browser.pause(3000)
    })

    it("Frames switch", async()=>{
        await browser.url("https://rahulshettyacademy.com/AutomationPractice/")
        await browser.pause(3000)
        await $("#mousehover").scrollIntoView()
        // console.log("total links length is :"+await $$("a").length)
        // await browser.pause(3000)
        await browser.switchToFrame(await $("[id='courses-iframe']"))

        // await browser.switchToFrame(await $("#courses-iframe"))

        // const iframe = await $("#courses-iframe")
        // console.log(await iframe.isDisplayed())
        // await browser.switchToFrame(await iframe)
        console.log("total frame links length is :"+await $$("a").length)
        await browser.switchToFrame(null)   //switch back to parent frame
        console.log("total parent links length is :"+await $$("a").length)
        
    })
       

})