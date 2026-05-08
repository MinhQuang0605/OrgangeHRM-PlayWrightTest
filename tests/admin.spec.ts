import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'
import { LoginPage } from '../pages/LoginPage'

test.describe("Admin Page test", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("Admin", "admin123");
        await page.waitForURL("**/dashboard/**", { timeout: 10000 })
        const homePage = new HomePage(page);
        await homePage.sidebarMenuNames.first().waitFor({ state: 'visible', timeout: 10000 });
        await homePage.clickItemOnMenu("Admin");
        await page.waitForTimeout(2000)
    });

    test("Fill Username with valid value ", async ({ page }) => {
        let value = "Admin"
        const adminPage = new AdminPage(page);
        adminPage.fillUserName(value);
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        //  expect(adminPage.employeeRow(value)).toBeTruthy
         await page.waitForTimeout(2000)
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("Fill Username with invalid value ", async ({ page }) => {
        let value = "Admin123"
        const adminPage = new AdminPage(page);
        adminPage.fillUserName(value);
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        // expect(adminPage.employeeRow(value)).toBeTruthy
        await page.waitForTimeout(3000)
        expect(await adminPage.getSearchResultCount()).toBe(0)
        await page.waitForTimeout(1000)
    })
    test("Find admin role user ", async ({ page }) => {
        const adminPage = new AdminPage(page)
        adminPage.clickAdminDropdown()
        await page.waitForTimeout(2000)
        adminPage.clickSearchButton()
        await page.waitForTimeout(2000)
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
     test("Find admin role user and with invalid username ", async ({ page }) => {
        const adminPage = new AdminPage(page)
        let value = "admin123"
        adminPage.clickAdminDropdown()
        await page.waitForTimeout(1000)
        adminPage.fillUserName(value)
        await page.waitForTimeout(5000)
        expect(await adminPage.getSearchResultCount()).toBe(0)
        await page.waitForTimeout(2000)
    })
})