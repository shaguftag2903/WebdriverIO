import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {

    get authSignIn(){
        return $(".authorization-link")
    }

    get customerLoginText(){
        return $("h1 span")
    }

    get email(){
        return $("#email")
    }

    get password(){
        return $("#pass")
    }

    get errorLoginInfo(){
        return $("//div[contains(text(),'incorrect')]")
    }

    get btnSignin(){
        return $("#send2")
    }

    get notLoggedInInfo(){
        return $(".not-logged-in")
    }


    async login(username, password) {
        await this.email.setValue(username);
        await this.password.setValue(password);
        await this.btnSignin.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    appUrl () {
        return super.appUrl('login');
    }
}

export default new LoginPage();

