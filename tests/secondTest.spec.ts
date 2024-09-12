import {test, expect} from "@playwright/test"
import { assert } from "console"

test.beforeAll(() => {

})

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('locator syntac rules', async({page}) => {
    // By Tag name
    page.locator('input')

    //By ID
    await page.locator('#inputEmail1').click()

    // by Class value
    page.locator('.shape-rectangle')

    // by Attribute
    page.locator('[placeholder="Email"]')

    // by Class value(full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    // by xPath (NOT Recommend)
    page.locator('//*[@id="inputEmail1"]')

    // By the partial text match
    page.locator(':text("Using')

    // By exact text match
    page.locator(':text-is("Using the Grid")')

})


test('User facing locations', async({page}) =>{
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()


    await page.getByLabel('Email').first().click()


    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating the child element', async({page}) =>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent element', async({page}) => {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator(".status-danger")}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator("nb-checkbox")}).filter({hasText: "Sign in"})
            .getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})


test('Reusing the locators', async({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})

    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting Values', async({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})

    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    // All Text value
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // How to find input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')


    const placeholder = await emailField.getAttribute('placeholder')
    expect(placeholder).toEqual('Email')

})

test('Assertions', async({page}) =>{
    // General 
    const value = 5
    expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')

    const text = await basicFormButton.textContent()

    expect(text).toEqual('Submit')


    // locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})

test('Autowaiting', async({page}) => {







})





