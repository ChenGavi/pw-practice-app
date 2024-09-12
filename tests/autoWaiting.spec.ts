import {test, expect} from "@playwright/test"
import { timeout } from "rxjs-compat/operator/timeout"


test.beforeAll(() => {

})

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)

})

test('auto waiting', async({page}) =>{
    const successButton = page.locator('.bg-success')

    // await successButton.click()
    // const text = await successButton.textContent()
    // expect(text).toEqual("Data loaded with AJAX get request.")

    // // Another Method
    // await successButton.waitFor({state: "attached"})
    // const text_1 = await successButton.allTextContents()  // it will fail
    // expect(text_1).toContain("Data loaded with AJAX get request.")

    await expect(successButton).toHaveText("Data loaded with AJAX get request", {timeout: 20000})
})

test('alternative waiting', async({page}) => {

    const successButton = page.locator('.bg-success')

    // // Wait for Element
    // await page.waitForSelector('.bg-success')

    // //Wait for paiticular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // Wait for network calls to be completed('NOT RECOMMEND')
    await page.waitForLoadState('networkidle')

    const text_1 = await successButton.allTextContents()
    expect(text_1).toContain("Data loaded with AJAX get request.")
})

test('timeout', async({page})=> {

    // test.setTimeout(1000)
    test.slow()

    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000})


})