import selectors from '../selectors/header.sel';
import expected from '../expected/header.exp';


describe('Header', () => {

    describe('Elements-displayed', () => {

        it('Header', () => {
            browser.url('/')
            expect($(selectors.header)).toBeDisplayed()
        })

        it('Rating-button', () => {
            expect($(selectors.ratingButton)).toBeDisplayed()
        })

        it('Public-game-button', () => {
            expect($(selectors.publicGameButton)).toBeDisplayed()
        })
    })

    describe('Functionality', () => {

        it('Ratings-button-redirects', () => {
            $(selectors.ratingButton).click()
            expect(browser).toHaveUrl(expected.ratingPageUrl)
        })
        it('Ratings-page-displayed', () => {
            expect($(selectors.ratingPage)).toBeDisplayed()
        })
        it('Back-to-login-btn', () => {
            expect($(selectors.backToLoginBtn)).toBeDisplayed()
        })
        it('Back-to-login-btn', () => {
            expect($(selectors.headerMenu)).toBeDisplayed(selectors.backToLoginBtn)
        })

        it('Back-to-login-btn', () => {
            $(selectors.backToLoginBtn).click()
            expect(browser).toHaveUrl(expected.pageUrl)
        })
        it('Back-to-login-page', () => {
            expect($(selectors.loginPage)).toBeDisplayed()
        })
        
        it('Public-game-redirects', () => {
            $(selectors.publicGameButton).click()
            expect(browser).toHaveUrl(expected.publicGameUrl)
        })
        
        it('Public-game-displayed', () => {
            expect($(selectors.publicGame)).toBeDisplayed()
        })
        
        it('Back-to-login-btn', () => {
            $(selectors.backToLoginBtn).click()
            expect(browser).toHaveUrl(expected.pageUrl)
        })

    })

})