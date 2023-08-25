import { $ } from '@wdio/globals'
import Page from './page.js';

class WhatsNewPage {

    get infoUserLogin(){
        return $(".logged-in")
    }

    get lnkWhatsNew(){
        return $("#ui-id-3")
    }

    get infoWhatsNew(){
        return $(".base")
    }

    async clickOnWhatsNew(){
        await this.lnkWhatsNew.click()
    }

    async verifyWhatsNewHeader(){
        await this.infoWhatsNew
    }

    get lnkTees(){
        return $("//a[text()='Tees']")
    }

    async clickOnTeesSection(){
        await this.lnkTees.click()
    }

    get filterOptions(){
        return $("#layered-filter-block")
    }

    get selectSize(){
        return $("//div[text()='S']")
    }

    get selectColor(){
        return $("//div[@aria-label='Black']")
    }

    get btnAddToCart(){
        return $("//span[text()='Add to Cart']")
    }

    get iconCart(){
        return $(".minicart-wrapper")
    }

    get btnCartCheckout(){
        return $("#top-cart-btn-checkout")
    }

    get inputStreet(){
        return $("//input[@name='street[0]']")
    }

    get inputCity(){
        return $("//input[@name='city']")
    }

    get inputCountry(){
        return $("//select[@name='country_id']")
    }

    get inputState(){
        return $("//select[@name='region_id']")
    }

    get inputZipCode(){
        return $("//input[@name='postcode']")
    }

    get inputPhNum(){
        return $("//input[@name='telephone']")
    }

    get infoShippingMethod(){
        return $("//div[text()='Shipping Methods']")
    }

    get flatRate(){
        return $("//tbody/tr[1]")
    }

    get tableRate(){
        return $("//tbody/tr[2]")
    }

    get btnNext(){
        return $("//span[text()='Next']")
    }

    async fillAddress(street,city,state,country,zipcode,phoneNum){
        await this.inputStreet.setValue(street)
        await this.inputCity.setValue(city)
        await this.inputState.selectByVisibleText(state)
        await this.inputCountry.selectByVisibleText(country)
        await this.inputZipCode.setValue(zipcode)
        await this.inputPhNum.setValue(phoneNum)
    }

    async selectShippingAndNext(){
        await this.tableRate.click()
        await this.btnNext.click()
    }

    get checkboxAddress(){
        return $("#billing-address-same-as-shipping-checkmo")
    }

    get btnPlaceOrder(){
        return $("//span[text()='Place Order']")
    }

    get orderConfirmationMsg(){
        return $(".base")
    }

    // async selectShippingAndNext(rate){
    //     if(rate.equals("tableRate")){
    //         await this.tableRate.click()
    //     } else{
    //         await this.flatRate.click()
    //     }
    //     await this.btnNext.click()
    // }


}

export default new WhatsNewPage();
