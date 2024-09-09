import {test} from "@playwright/test"

test.beforeAll(() => {

})

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')

})


test.describe('suite 1', ()=> {

    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    })

    test('the first test', async ({page}) => {

        await page.getByText('Form Layouts').click()
    })
    
    
    test('navigate to datepicker', async ({page}) => {
    
        await page.getByText('Datepicker').click()
    })

})


test.describe('suite 2', ()=> {

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test('the first test', async ({page}) => {

        await page.getByText('Form Layouts').click()
    })
    
    
    test('navigate to datepicker', async ({page}) => {
    
        await page.getByText('Datepicker').click()
    })

})

