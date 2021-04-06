import selectors from '../selectors/footer.sel';
import expected from '../expected/footer.exp';

describe('Footer', () => {

    describe('Elements-displayed', () => {

        it('Footer', () => {
            browser.url('/')
            expect($(selectors.footer)).toBeDisplayed()
        })
        it('Language-selection', () => {
            expect($(selectors.languageSelection)).toBeDisplayed()

        })
        it('Copyright-text', () => {
            expect($(selectors.copyRightText)).toBeDisplayed()

        })
        it('Version', () => {
            expect($(selectors.versionText)).toBeDisplayed()

        })
        it('Developer-link', () => {
            expect($(selectors.developerLink)).toBeDisplayed()

        })
    })

    describe('Elements-values', () => {

        it('Copyright-text', () => {
            expect($(selectors.copyRightText)).toHaveTextContaining(expected.copyRightText)
        })

        it('Version-text', () => {
            expect($(selectors.versionText)).toHaveTextContaining(expected.versionText)
        })

        it('Website-by-text', () => {
            expect($(selectors.versionText)).toHaveTextContaining(expected.websiteByText)
        })

        it('Website-by-link', () => {

            expect($(selectors.developerLink)).toHaveHref('https://www.reactsmart.dev/')
        })

    })

})