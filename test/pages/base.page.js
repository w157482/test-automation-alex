class Base {
    checkPlaceholder(field, expected) {
        expect($(field)).toHaveAttribute('placeholder', expected)
    }

     
    errorMessageDisappears(field, error) {
        $(field).setValue('a') //Enter 'a' into the field
        $(error).waitForDisplayed({ reverse: true }) //reverse means waitForNotDisplayed
    }

     

}

export default Base;