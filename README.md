Test Automation Course. TechStart.dev. WebDriverIO.

[[_TOC_]]

---
## Prerequisites:
1. [Node.js](https://nodejs.org/)
2. [Git](https://git-scm.com/)
3. [Python](https://www.python.org/downloads/)
4. [Java](https://www.java.com/en/download/)
5. Install/Update [Chrome browser](https://www.google.com/chrome/) to the latest version

---
## 1. WebDriverIO. Installation and initial configuration. Babel setup. Allure reporter. First tests.
1. Initialize Node.js project:
````
npm init -y
````
2. Install WDIO CLI:
````
npm install @wdio/cli
````
3. Launch initial configuration guide:
````
npx wdio config
````
and select/specify the following options:
- select `On my local machine`
- select `mocha`
- select `sync`
- select `Babel`
- type `./test/specs/*.js`
- type `N`
- select `spec` and `allure`
- select `chromedriver`
- type `http://qa.intgames.org`

Wait till the end of the installation.

4. Install Babel modules:
````
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
````

5. Create `babel.config.js` file and paste the following code into it:
````
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: '12'
            }
        }]
    ]
}
````

6. Create `test` folder, then `specs` folder inside of it and finally `test.js` file in `specs` folder. Paste the following code into the file:
````
describe('Elements', () => {

    it('Page-title-is-correct', () => {
        browser.url('/');
        const title = browser.getTitle();
        console.log('Title is: ' + title);
    })

    it('Page-URL-is-correct', () => {
        const URL = browser.getUrl();
        console.log('URL is: ' + URL);
    })

})
````

7. Run your firts test:
````
npx wdio run ./wdio.conf.js
````

8. Replace `test` script in `package.json` by:
````
 "test": "npx wdio run ./wdio.conf.js"
````
Now you can trigger the test by running `npm run test` or `npm test` or `npm t`.

9. Install Allure commandline:
````
npm install -g allure-commandline
````

10. Generate Allure report from results:
````
allure generate
````

11. Open Allure report:
````
allure open
````

12. Add `report` script to `package.json`:
````
    "report": "allure generate && allure open"
````

13. Create `.gitignore` file with the following code:
````
node_modules
allure-report
allure-results
temp
````

14. Use [WebDriverIO API reference](https://webdriver.io/docs/api) to add more tests, `expect` validation, and cover the Login page by tests.

### Homework 1
- Finish `Elements-displayed` suite
- Finish `Elements-values` suite
- Rename `test.js` to `login.js`
- Create `forgot.js` file in `specs`
- Create and cover by tests the same suites as for Login page

Few commands to use:
````
browser.url('url')
expect(browser).toHaveUrl('expected-url')
expect(element).toBeDisplayed()
expect(element).toHaveAttribute('attributeName', 'value')
expect(element).toHaveText('expected-value')
expect(element).toHaveTextContaining('expected-value')
````
---
## 2. Framework configuration. Temp folder. Reporter Configuration. Hooks. Screenshots.
1. Create `temp` folder in the root project directory.
2. In `wdio.conf.js` make the following changes:
````
    logLevel: 'silent',

    waitforTimeout: 40000,

    reporters: ['spec', ['allure', { outputDir: 'temp/allure-results' }]],

    before: function (capabilities, specs) {
        browser.maximizeWindow();
    },    

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            let fullName = `${test.parent}.${test.title}`;
            browser.saveScreenshot(`./temp/screenshots/${fullName}.png`);
        }
    },
````
3. In `package.json` add new scripts and make the following changes:
````
    "clean": "rm -rf temp"

    "temp": "mkdir temp\\screenshots" //for Windows
    "temp": "mkdir temp temp/screenshots" //for MacOS

    "prepare": "npm run clean && npm run temp"
````
Also, include `prepare` into the `test` script:
````
    "test": "npm run prepare && npx wdio run ./wdio.conf.js"
````
Add the new path to the Allure reporter script:
````
    "report": "allure generate ./temp/allure-results -o ./temp/allure-report && allure open ./temp/allure-report"
````
4. Wrap `login.js` code in a higher level `describe`:
````
describe('Login', () => {

    //All test suites

})
````
5. Wrap `forgot.js` code in a higher level `describe`:
````
describe('Forgot', () => {

    //All test suites

})
````
### Homework 2
Write functional tests for `login.js` and `forgot.js`:

Login:
- Clicking Ratings button redirects to `http://qa.intgames.org/users`
- Rating page is displayed
- Back to Login button is displayed in Header
- Back to Login redirects to `http://qa.intgames.org/`
- Login page is displayed
- Clicking Public Game redirects to `http://qa.intgames.org/public-game`
- Public game page is displayed
- Error message appears if both fields are empty and click Login: `Please specify email and password`
- Error message disapears on input in Email field
- Error message appears if only Password field is empty and click Login: `Please specify email and password`
- Error message disapears on input in Password field
- Error message appears if only Email field is empty and click Login: `Please specify email and password`
- Error message appears if Email is incorrect: `User with this email does not exist`
- Error message appears if Email is correct (use `info@techstart.dev`) but Password is not: `Password is incorrect`

Forgot:
- Remind Password redirecs to `http://qa.intgames.org/forgot`
- Remind Password page is displayed
- Error message appears if only Email field is empty and click Remind Password: `Please specify email`
- Error message disapears on input in Email field
- Error message appears if Email is incorrect: `User with this email does not exist`
- Success message appears if Email is correct (use `info@techstart.dev`): `Password reminder sent`
- User is redirected to `http://qa.intgames.org/` in 3 sec after the password reminder was sent.

Few commands to use:
````
browser.url('url')
$('selector').click()
$('selector').setValue('value')
$('selector').waitForDisplayed({ reverse: true })
expect(browser).toHaveUrl('expected-url')
expect($('selector')).toHaveText('expected')
expect($('selector')).toBeDisplayed()
expect(browser).toHaveUrl('expected-url', { wait: 3000 })
````
---
## 3. Framework approach. Expected results and selectors.
1. Create `pages`, `expected` and `selectors` folder in the `test` directory.
2. Create `login.page.js` in `pages` directory and paste the following code into the created file:
```
class Login {

}

export default new Login;
```
4. Create `login.sel.js` in `selectors` directory and paste the following code into the created file:
```
export default {

};
```
5. Create `login.exp.js` in `expected` directory and paste the following code into the created file:
```
export default {
    
};
```
6. Repeat steps 2-5 for `forgot.js` test.
7. Create a separate files for Header in all test folders with the content according to steps 2-5 (but names properly for Header):
- `header.page.js` in `pages` directory
- `header.sel.js` in `selectors` directory
- `header.exp.js` in `expected` directory
- `header.js` in `specs` directory
8. Repeat step 7 for Footer.
9. For both `header.js` and `footer.js` create the following test structure (same as for the other tests):
```
describe('Replace-this-title', () => {

    describe('Replace-this-title', () => {

        it('Replace-this-title', () => {
           
        })

    })

    describe('Replace-this-title', () => {

        it('Replace-this-title', () => {
          
        })

    })

})
```
10. Move all tests for Header and Footer from `login.js` and `forgot.js` test files to `header.js` and `footer.js` respectively.
11. Move all selectors from specs to corresponding files in `selectors` folder. Make the keys in object descriptive and clear. For example:
```
export default {
    copyright: 'copyright-text'
};
```
12. Move all expected results from specs to corresponding  files in `expected` folder. Make the keys in object descriptive and clear. For example:
```
export default {
    copyright: '© Mafia Club Portal'
};
```
13. Import selectors and expected results into specs:
```
import selectors from '../selectors/footer.sel';
import expected from '../expected/footer.exp';

describe('Footer', () => {
    //some code below
```
14. Replace hardcoded values in specs by imported data
```
        it('Copyright', () => {
            expect($(selectors.copyright)).toHaveText(expected.copyright)
        })
```
### Homework 3
- import selectors and expected results in all specs.
- replace hardcoded values by data from the imported files in all specs.

## 4. Framework approach. Page Object Model.
1. Open `login.page.js`, import selectors and expected results:
```
import selectors from '../selectors/login.sel';
import expected from '../expected/login.exp';
```
2. Create method for opening the Login page:
```
    openPage() {
        browser.url(selectors.URL)
    }
```
3. Import `login.page.js` into `login.js` spec:
```
import login from '../pages/login.page';
```
4. In `login.js` replace hardcoded method:
```
browser.url(selectors.URL);
```
by
```
login.openPage();
```
5. Create `data` folder in `test` directory.
6. Create `credentials.js` in `data` directory with the following content:
```
export default {
    player: {
        email: 'test@test.com',
        password: 'maftest@123456'
    }
};
```
7. Import credentials into `login.page.js`:
```
import creds from '../data/credentials';
```
8. In `login.page.js` create more methods for login form validation:
```
    emptyPasswordError() {
        this.openPage();
        $(selectors.emailField).setValue(creds.player.email); //Enter valid email into email field
        $(selectors.btnLogin).click();
        expect($(selectors.error)).toBeDisplayed();
        expect($(selectors.error)).toHaveText(expected.errorEmpty);
    }

    emptyEmailError() {
        this.openPage();
        $(selectors.passField).setValue(creds.player.password); //Enter valid pass into password field
        $(selectors.btnLogin).click();
        expect($(selectors.error)).toBeDisplayed();
        expect($(selectors.error)).toHaveText(expected.errorEmpty);
    }

    bothFieldsEmptyError() {
        this.openPage();
        $(selectors.btnLogin).click();
        expect($(selectors.error)).toBeDisplayed();
        expect($(selectors.error)).toHaveText(expected.errorEmpty);
    }

    incorrectEmailError() {
        this.openPage();
        $(selectors.emailField).setValue(creds.player.email + 'a'); //Enter invalid email into email field
        $(selectors.passField).setValue(creds.player.password); //Enter valid pass into password field
        $(selectors.btnLogin).click();
        expect($(selectors.error)).toBeDisplayed();
        expect($(selectors.error)).toHaveText(expected.errorEmail);
    }

    incorrectPasswordError() {
        this.openPage();
        $(selectors.emailField).setValue(creds.player.email); //Enter valid email into email field
        $(selectors.passField).setValue(creds.player.password + 'a'); //Enter invalid pass into password field
        $(selectors.btnLogin).click();
        expect($(selectors.error)).toBeDisplayed();
        expect($(selectors.error)).toHaveText(expected.errorPassword);
    }
```
9. Replace hardcoded functions in `login.js` spec by methods from `login.page.js`. For example:
```
        it('Error-appears-email-is-empty', () => {
            browser.url(selectors.URL); //refresh the page to have both fields empty
            $(selectors.passField).setValue('a') //Enter something to password field leaving email empty
            $(selectors.btnLogin).click()
            expect($(selectors.error)).toBeDisplayed()
        })

        it('Error-text-email-is-empty', () => {
            expect($(selectors.error)).toHaveText(expected.errorEmpty)
        })
```
by
```
        it('Error-appears-email-is-empty', () => {
            login.emptyEmailError();
        })
```
Repeat this for all created methods.

10. Create reusable method in `login.page.js` to check that error-message dissapears on input:
```
    errorMessageDisappears(field) {
        $(field).setValue('a') //Enter 'a' into the field
        $(selectors.error).waitForDisplayed({ reverse: true }) //reverse means waitForNotDisplayed
    }
```
11. Replace hardcoded functions in `login.js` spec by methods from `login.page.js`:
```
        it('Error-dissapears-on-input-in-email', () => {
            $(selectors.emailField).setValue('a') //Enter 'a' into email field
            $(selectors.error).waitForDisplayed({ reverse: true }) //reverse means waitForNotDisplayed
        })
```
by
```
        it('Error-dissapears-on-input-in-email', () => {
            login.errorMessageDisappears(selectors.emailField)
        })
```
Repeat this for all hardcoded functions.

12. Create `base.page.js` in `pages` directory with the following content:
```
class Base {

}

export default Base;
```
13. Import `Base` page into `Login` page and extend it:
```
import Base from './base.page';
```
```
class Login extends Base {
```
14. In `base.page.js` create a reusable method for placeholder verification:
```
    checkPlaceholder(field, expected) {
        expect($(field)).toHaveAttribute('placeholder', expected)
    }
```
15. Replace hardcoded functions in `login.js` spec by reusable method from `base.page.js`:
```
        it('Email-placeholder', () => {
            expect($(selectors.emailField)).toHaveAttribute('placeholder', expected.emailPlaceholder)
        })
```
by
```
        it('Email-placeholder', () => {
            login.checkPlaceholder(selectors.emailField, expected.emailPlaceholder);
        })
```
Repeat this for Password field placeholder test.

16. Create `before()` hook just before your first `it()` in `login.js`:
```
        before(() => {
            
        })
```
17. Move your page opening method from first `it()` to the created hook:
```
        before(() => {
            login.openPage();
        })
```
Now the page open before testing.

18. Move `errorMessageDisappears(field)` method from `login.page.js` to `base.page.js` and add an additional argument `error`:
```
    errorMessageDisappears(field, error) {
        $(field).setValue('a') //Enter 'a' into the field
        $(error).waitForDisplayed({ reverse: true }) //reverse means waitForNotDisplayed
    }
```

### Homework 4
- repeat steps 1-4, 7-9, 11, and 13-17 for Forgot Password page and tests.
- create methods in `forgot.page.js` for `Link-on-Login-redirects-to-Forgot-page`, `Success-appears-email-is-correct` and `Redirect-to-Login-page-in-3-sec` tests. Use them in `forgot.js` spec.
- repeat steps 1-4, 13, and 16-17 for Header and Footer page and tests.
- register on [GitHub](https://github.com/)

---
## 5. Git. Branching and PR strategy.
1. Add `.idea` and `.DS_Store` to `.gitignore` file. It's content should be the following:
```
node_modules
allure-report
allure-results
temp
.idea
.DS_Store
```
2. Create `README.md` file in root directory.
3. Copy the content of `README` file [from Azure DevOps](https://dev.azure.com/ReactSmartDev/MafiaClubPortal/_git/test-automation?path=%2FREADME.md) and paste it into your local file.
4. Create a new repo on GitHub by clicking https://github.com/new:
- Specify `Repository name`
- Select `Public`
- Click `Create repository` button.

5. GitHub will display the list of commands you need to run to publish your existing repo. Before that, initialize git in your repo by running:
```
git init
```
6. Then add all files to the next commit:
```
git add .
```
7. And create the first commit:
```
git commit -m "publishing the repo to GitHub"
```
8. Finally, you may copy the commands from GitHub and run them, e.g.:
```
git remote add origin https://github.com/artsenius/test-automation.git
git branch -M master
git push -u origin master
```
Done. You have the template of your repo for the future reference.

9. Now let's close this project and start working in Azure DevOps on our main repo. Open your `projects` folder with VS Code and open Terminal. Then run:
```
git clone https://ReactSmartDev@dev.azure.com/ReactSmartDev/MafiaClubPortal/_git/test-automation
```
10. Once done, open the clonned project (`test-automation`) in VS Code and run:
```
npm i
```
Please note that now you need to run `npm run win` or `npm run mac` to start the test on a corresponding OS.

11. Branching strategy:
- you work on your own branch.
- branch name should be your first and last name. For example, `arthursenko` or `asenko`.
- create your own branch out of `master` branch by running `git checkout -b <name-of-branch>`.
- run `git add .` and `git commit -m "message"` as soon as you have working code.
- push your code to the repo once your task is done.
- run `git pull origin master` as frequently as possible (once there were changes).

12. PR strategy:
- Select `integration` as your compare branch.
- Create PRs for merging your branch into `integration` branch.
- Link you work item.
- Resolve all conflicts and comments.

### Homework 5
- Create your own branch.
- Pick the item from the Sprint board and complete it.
- Make a PR with your completed code.