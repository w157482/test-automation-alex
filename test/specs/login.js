import selectors from '../selectors/login.sel';
import expected from '../expected/login.exp';
import login from '../pages/login.page';

describe('Login', () => {
    describe('App-data', () => {

        before(() => {
            login.openPage();  
        })

        it('Page-title-is-correct', () => {
          
            expect(browser).toHaveTitle(expected.pageTitle)
        })

        it('Page-URL-is-correct', () => {
            const URL = browser.getUrl();
            expect(browser).toHaveUrl(selectors.pageUrl)
        })
    })

    describe('Elements-displayed', () => {

        it('Logo', () => {
            expect($(selectors.logo)).toBeDisplayed()
        })

        it('Email-feild', () => {
            expect($(selectors.emailField)).toBeDisplayed()

        })
        it('Password-feild', () => {
            expect($(selectors.passwordField)).toBeDisplayed()

        })
        it('Remind-password', () => {
            expect($(selectors.remindPassword)).toBeDisplayed()

        })


    })

    describe('Elements-values', () => {

        it('Email-placeholder', () => {
            login.checkPlaceholder(selectors.emailField, expected.emailPlaceHolder)
           

        })

        it('Password-placeholder', () => {
            login.checkPlaceholder(selectors.passwordField, expected.passwordPlaceHolders)
           
        })

        it('Login-button', () => {
            expect($(selectors.buttonLogin)).toHaveText(expected.loginButtonText)
        })

        it('Remind-Password-button', () => {
            expect($(selectors.remindPassword)).toHaveText(expected.remindPasswordBtnText)
        })


    })

    describe('Functionality', () => {



        it('Email&Password-empty', () => {
            login.bothFieldsEmptyError();
        })

        it('Email&Pass-Refresh', () => {
            login.errorMessageDisappears(selectors.emailField, selectors.errorText)
        })

        it('Only-password-empty', () => {
            login.emptyPasswordError()
        })

        it('Only-password-empty-refresh', () => {
            login.errorMessageDisappears(selectors.passwordField, selectors.errorText)
        })

        it('Only-email-empty', () => {
            login.emptyEmailError()
        })


        it('Email-is-incorrect', () => {
            login.incorrectEmailError()
        })


        it('Password-is-incorrect', () => {
            login.incorrectPasswordError()
        })

    })
})
