import selectors from '../selectors/login.sel';
import expected from '../expected/login.exp';
import creds from '../data/credentials';
import Base from './base.page';

class Login extends Base {
    openPage() {
        browser.url(selectors.pageUrl)
    }

    bothFieldsEmptyError() {
        this.openPage();
        $(selectors.buttonLogin).click();
        expect($(selectors.errorText)).toBeDisplayed();
        expect($(selectors.errorText)).toHaveText(expected.errorTextEmpty);
    }

   
    
    emptyPasswordError() {
        this.openPage();
        $(selectors.emailField).setValue('a'); //Enter valid email into email field
        $(selectors.buttonLogin).click();
        expect($(selectors.errorText)).toBeDisplayed();
        expect($(selectors.errorText)).toHaveText(expected.errorTextEmpty);
    }
   

    emptyEmailError() {
        this.openPage();
        $(selectors.passwordField).setValue(creds.player.password + 'a'); //Enter valid pass into password field
        $(selectors.buttonLogin).click();
        expect($(selectors.errorText)).toBeDisplayed();
        expect($(selectors.errorText)).toHaveText(expected.errorTextEmpty);
    }

    

    incorrectEmailError() {
        this.openPage();
        $(selectors.emailField).setValue(creds.player.email + 'a'); //Enter invalid email into email field
        $(selectors.passwordField).setValue(creds.player.password); //Enter valid pass into password field
        $(selectors.buttonLogin).click();
        expect($(selectors.errorText)).toBeDisplayed();
        expect($(selectors.errorText)).toHaveText(expected.incorrectEmailErrorText);
    }

    incorrectPasswordError() {
        this.openPage();
        $(selectors.emailField).setValue('info@techstart.dev'); //Enter valid email into email field
        $(selectors.passwordField).setValue(creds.player.password + 'a'); //Enter invalid pass into password field
        $(selectors.buttonLogin).click();
        expect($(selectors.errorText)).toBeDisplayed();
        expect($(selectors.errorText)).toHaveText(expected.incorrectPasswordErrorText);
    }
    
    
}

export default new Login;