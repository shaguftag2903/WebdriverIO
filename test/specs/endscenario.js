describe('End to end test case for purchase',  async()=>
{
    it('First Test - session53', async()=>
    {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/")
        const products = ["Nokia Edge","Blackberry"]

        await $("#username").setValue("rahulshettyacademy")
        const pwd = $("#password")
        await pwd.setValue("learning")
        const signInBtn = $("#signInBtn")
        await signInBtn.click()
        await browser.pause(3000)
        console.log(await $("=ProtoCommerce Home").isDisplayed())
        // const item1 = $("*=Edge")
        // console.log(await item1.isDisplayed())
        // console.log(await item1.getText())
        // await item1.click()
        const items = $$("//div[@class='card h-100']")
        for(let i=0;i<await items.length;i++){
            const itemName =items[i].$("div h4 a")
           console.log("ITemname:"+await itemName.getText())
           if(products.includes(await itemName.getText())){
                await items[i].$(".card-footer button").click()
           }
        }

        
        await $("*=Checkout").click()
        console.log(await $("//button[contains(text(),'Checkout')]").isDisplayed())  
//now verify the sum of products assert it.
        const pprice =await $$("//tr/td[4]/strong")
        // const sumOfPdts = await Promise.all(await pprice.map(async (pprice)=>parseInt((await pprice.getText()).split(".")[1].trim())))
        // .reduce((acc,price)=>acc+price,0)
        // console.log(sumOfPdts)
        const totalVal =await $("//h3/strong").getText()
        const totalIntSum = parseInt(await totalVal.split(".")[1].trim())
        // await expectChai(sumOfPdts).to.equal(totalIntSum)
        
        console.log(totalIntSum)
        // expect(totalIntSum).toEqual(sumOfPdts)
        
        await $(".btn-success").click()
        await $("#country").setValue("ind")
        await $(".lds-ellipsis").waitForExist({reverse:true})
        await $("=India").click()
        await $("input[type='submit']").click()
        await expect($(".alert-success")).toHaveTextContaining("Success")

        
        // console.log(parseInt(await $("//h3/strong").getText().split(".").trim()))


        // await $("//button[contains(text(),'Checkout')]").click() 
        await browser.pause(3000)   
        // console.log("******************************"+await $("input[type='submit']").isDisplayed()) 
    })
})