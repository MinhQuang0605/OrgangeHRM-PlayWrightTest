import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'
import { LoginPage } from '../pages/LoginPage'
import process from 'node:process'


test.describe("Admin Page test", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.adminLogin()
        await page.waitForURL("**/dashboard/**", { timeout: 10000 })
        const homePage = new HomePage(page);
        await homePage.sidebarMenuNames.first().waitFor({ state: 'visible', timeout: 10000 });
        await homePage.clickItemOnMenu("Admin");
        await page.waitForURL("**/viewSystemUsers", { timeout: 10000 })
    });

    test("Fill Username with valid value ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG,"Skip while debugging")
        let value = "Admin"
        const adminPage = new AdminPage(page);
        await adminPage.fillUserName(value);
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        //  expect(adminPage.employeeRow(value)).toBeTruthy
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("Fill Username with invalid value ", async ({ page }) => {
        let value = "Admin123"
        const adminPage = new AdminPage(page);
        await adminPage.fillUserName(value);
        await adminPage.searchButton.click();
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        // expect(adminPage.employeeRow(value)).toBeTruthy
        await page.waitForTimeout(1000)
        // await page.pause();
        //await expect(await adminPage.getSearchResultCount()).toBe(0)
        // const isVisible = await adminPage.ErrorMessageResult.isVisible();
        // expect(isVisible).toBeTruthy()
        expect(await adminPage.ErrorMessageResult).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("Find admin role user ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging");
        const adminPage = new AdminPage(page)
        await page.waitForTimeout(1000)
        await adminPage.clickAdminDropdown()
        await page.waitForTimeout(2000)
        //await adminPage.clickSearchButton()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("Find admin role user and with invalid username ", async ({ page }) => {
        const adminPage = new AdminPage(page)
        let value = "admin123"
        await page.waitForTimeout(1000)
        await adminPage.clickAdminDropdown()
        await page.waitForTimeout(1000)
        await adminPage.fillUserName(value)
        await page.waitForTimeout(1000)
        expect(await adminPage.ErrorMessageResult).toBeTruthy()
        await page.waitForTimeout(2000)
    })
})