import selectors from '../selectors/forgot.sel';
import expected from '../expected/forgot.exp';
import creds from '../data/credentials';
import Base from './base.page';

class Forgot extends Base {


    openForgotPage() {
        browser.url(expected.forgotUrl)

    }

    forgotPassPageRedirects() {
        this.openForgotPage();
        browser.url(expected.pageUrl)
        $(selectors.btnForgot).click()
        expect(browser).toHaveUrl(expected.forgotUrl)
    }
    remindPasswordPage() {
        this.openForgotPage();
        expect($(selectors.forgotPage)).toBeDisplayed()
    }

    emailFieldEmptyError() {
        this.openForgotPage();
        $(selectors.btnRemind).click();
        expect($(selectors.errorText)).toBeDisplayed();
        expect($(selectors.errorText)).toHaveText(expected.emptyEmailField);
    }

    incorrectEmailError() {
        this.openForgotPage();
        $(selectors.emailField).setValue('alex')
        $(selectors.btnRemind).click()
        expect($(selectors.errorText)).toBeDisplayed()

    }

    incorectEmailRemindBtn() {
        this.openForgotPage();
        expect($(selectors.errorText)).toHaveText(expected.incorrectEmailText)
    }
    

    correctEmailRemindBtn() {
        this.openForgotPage();
        $(selectors.emailField).setValue('info@techstart.dev')
        $(selectors.btnRemind).click()
        expect($(selectors.errorText)).toBeDisplayed()

    }

    emailSentCorrect() {
        this.openForgotPage();
        expect($(selectors.errorText)).toHaveText(expected.correctEmailText)
    }

    textIsGreen() {
        this.openForgotPage();
        expect($('.green-text')).toHaveText()
        
    }
    wait3SecondsToRedirect() {
        this.openForgotPage();
        wait: 3000,
                expect(browser).toHaveUrl(expected.pageUrl)
    }





}


export default new Forgot;