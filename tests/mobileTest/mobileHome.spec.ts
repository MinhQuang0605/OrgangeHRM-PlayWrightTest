import {test,expect} from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'

test.describe("Home Page test on mobile",()=>{

    test.beforeEach(async({page})=>{
        const loginPage =  new LoginPage(page)
        const homePage = new HomePage(page)
        await loginPage.adminLogin()
        await page.waitForURL("**/dashboard/**", {timeout:10000})
        
    })
    test("Verify side bar menu items on mobile device", async({page})=>{
        const homePage= new HomePage(page)
        await homePage.hamburgerMenu.waitFor({state:'visible'})
        await homePage.hamburgerMenu.click()
        const menuItems= await homePage.getSideBarMenuItems();
        console.log("number of menu item: ", menuItems.length) 
        expect(menuItems.length).toBeGreaterThan(0) 
    })
    test("verify quick lauch button on mobile", async ({page})=>{
        const homePage= new HomePage(page)
        const buttons= await homePage.getQuickLaunchButton();
        await homePage.quickLauchButton.first().scrollIntoViewIfNeeded()
        console.log("number of buttons: ", buttons.length)
        expect(buttons.length).toBeGreaterThan(0)
    })

})