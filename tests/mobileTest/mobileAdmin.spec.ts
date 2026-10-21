import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'
import { AdminPage } from '../../pages/AdminPage'
import { log } from 'node:console'

test.describe("admin test on mobile", () => {

    test.beforeEach("Login and go to admin page", async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.adminLogin()
        await page.waitForURL("**/dashboard**", { timeout: 20000 })
        const homePage = new HomePage(page)
        await homePage.hamburgerMenu.waitFor({ state: 'visible' })
        await homePage.hamburgerMenu.click()
        await homePage.clickItemOnMenu("Admin")
        await homePage.sidebarMenuItems.first().waitFor({ state: 'visible', timeout: 10000 })
        const adminPage = new AdminPage(page)
        await adminPage.mobileAdminDropDown.waitFor({ state: "visible" })
        await adminPage.mobileAdminDropDown.click()
    })

    test("find valid user on mobile device", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.fillUserName("Admin")
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
    })

    test("find invalid user on mobile device", async ({ page }) => {
        const adminPage = new AdminPage(page)
        let name="Invalid"
        await adminPage.fillUserName(name)
       // await adminPage.ErrorMessageResult.waitFor({state:'visible'})
        expect (await adminPage.ErrorMessageResult).toBeTruthy()
    })
})