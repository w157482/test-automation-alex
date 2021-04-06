import selectors from '../selectors/forgot.sel';
import expected from '../expected/forgot.exp';
import forgot from '../pages/forgot.page';
import loginExp from '../expected/login.exp';


describe('Forgot', () => {
    describe('Elements', () => {

        it('Page-title-is-correct', () => {
            expect(browser).toHaveTitle('')
        })

        it('Page-URL-is-correct', () => {
            browser.url('/forgot');
            expect(browser).toHaveUrl(expected.forgotUrl)
        })
    })
    describe('Elements-displayed', () => {


        it('Remind-password-button', () => {
            expect($(selectors.remindPassButn)).toBeDisplayed()
        })
        it('Email', () => {
            expect($(selectors.emailField)).toBeDisplayed()
        })

    })

    describe('Elements-values', () => {

        it('Email-placeholder', () => {
            expect($(selectors.emailField)).toHaveAttr('placeholder', expected.emailFieldAttr)
        })

        it('Remind-Password-button', () => {
            expect($(selectors.remindPassButn)).toHaveText(expected.remindPassText)
        })


    })
    describe('Functionality', () => {


        it('Forgot-password-redirects', () => {
            forgot.forgotPassPageRedirects()
        })

        it('Remind-password-page', () => {
            forgot.remindPasswordPage()
        })
        it('Email-field-empty-error', () => {
            forgot.emailFieldEmptyError()
        })
        it('Email-is-incorrect-error', () => {
            forgot.incorrectEmailError()
        })
        it('Email-is-incorrect-click-remind', () => {
            forgot.incorectEmailRemindBtn()
        })
        it('Error-msg-disapears', () => {
              forgot.errorMessageDisappears()
        })

        it('Email-correct-click-remind', () => {
            forgot.correctEmailRemindBtn()
        })
        it('Email-correct-reminder-sent', () => {
            forgot.emailSentCorrect()
        })

        it('Text-is-green', () => {
            forgot.textIsGreen()
        })
        it('Wait-3-seconds-to-redirect', () => {
            forgot.wait3SecondsToRedirect()

        })


    })

})