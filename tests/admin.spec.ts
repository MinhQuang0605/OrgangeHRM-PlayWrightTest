import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'
import { LoginPage } from '../pages/LoginPage'
import process from 'node:process'
import { UserProfile } from '../utils/faker'
import { stat } from 'node:fs'


test.describe("Admin Page test", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.adminLogin()
        await page.waitForURL("**/dashboard/**", { timeout: 50000 })
        const homePage = new HomePage(page);
        await homePage.sidebarMenuNames.first().waitFor({ state: 'visible', timeout: 50000 });
        await homePage.clickItemOnMenu("Admin");
        await page.waitForURL("**/viewSystemUsers", { timeout: 50000 })
    });

    test("OHRM_ADMIN_003 Search using an exact existing username ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        let value = "Admin"
        const adminPage = new AdminPage(page);
        await adminPage.fillUserName(value);
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        //  expect(adminPage.employeeRow(value)).toBeTruthy
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("OHRM_ADMIN_004 Search using a partial username", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        let value = "Adm"
        const adminPage = new AdminPage(page);
        await adminPage.fillUserName(value);
        await adminPage.searchButton.click();
        await page.waitForTimeout(1000)
        expect(await adminPage.ErrorMessageResult).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("OHRM_ADMIN_005  Search with a username that does not exist ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        let value = "Admin123"
        const adminPage = new AdminPage(page);
        await adminPage.fillUserName(value);
        await adminPage.searchButton.click();
        await page.waitForTimeout(1000)
        expect(await adminPage.ErrorMessageResult).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test.fail("OHRM_ADMIN_006 Search by employee name using autocomplete ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        let value = "John Doe"
        const adminPage = new AdminPage(page);
        await adminPage.fillEmployeeName(value);
        await adminPage.searchButton.click();
        await page.waitForTimeout(1000)
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("OHRM_ADMIN_007 Enter an employee name that has no match", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        let value = "Chuck Norris"
        const adminPage = new AdminPage(page);
        await adminPage.fillEmployeeName(value);
        await adminPage.searchButton.click();
        await page.waitForTimeout(1000)
        const result = await adminPage.invalidMessage.waitFor({ state: 'visible' })
        expect(await result).toBeTruthy()
        await page.waitForTimeout(1000)
    })
    test("OHRM_ADMIN_008 Filter users by Admin user role ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging");
        const adminPage = new AdminPage(page)
        await adminPage.clickAdminDropdown()
        await page.waitForTimeout(2000)
        //await adminPage.clickSearchButton()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("OHRM_ADMIN_009 Filter users by ESS user role", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const adminPage = new AdminPage(page)
        await adminPage.clickESSDropdown()
        await page.waitForTimeout(2000)
        //await adminPage.clickSearchButton()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("OHRM_ADMIN_010 Filter users by Enabled status", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const adminPage = new AdminPage(page)
        const option="Enabled"
        await adminPage.clickStatusDropDown(option)
        await page.waitForTimeout(2000)
        //await adminPage.clickSearchButton()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("OHRM_ADMIN_011 Filter users by Disabled status", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const adminPage = new AdminPage(page)
        const option="Disabled"
        await adminPage.clickStatusDropDown(option)
        await page.waitForTimeout(2000)
        //await adminPage.clickSearchButton()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("OHRM_ADMIN_012 Search using multiple filter fields together ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const adminPage = new AdminPage(page)
        let value = "admin123"
        await adminPage.clickAdminDropdown()
        await adminPage.fillUserName(value)
        await page.waitForTimeout(1000)
        expect(await adminPage.ErrorMessageResult).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("OHRM_ADMIN_013 Verify Reset clears all search fields ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const adminPage = new AdminPage(page)
        let value = "admin123"
        await adminPage.clickAdminDropdown()
        await adminPage.fillUserName(value)
        await adminPage.resetButton.waitFor({state:'visible'})
        await adminPage.resetButton.click()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
    test("OHRM_ADMIN_014 Search with all filters empty ", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const adminPage = new AdminPage(page)
        await adminPage.clickSearchButton()
        await adminPage.dataRows.first().waitFor({ state: 'visible', timeout: 10000 })
        expect(await adminPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(2000)
    })
     test("OHRM_ADMIN_016 Verify record count matches displayed result set ", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.searchButton.waitFor({state:'visible'})
        await adminPage.searchButton.click()
        await page.waitForTimeout(1000)
        await adminPage.loadingSpinner.waitFor({state:'hidden'})
        expect(await adminPage.compareRecords()).toBeTruthy()
    })
    test("Add new valid Job Titles", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.getJobtitles()
        await adminPage.addButton.click()
        await adminPage.fillJobTitle("Bussiness Analyst")
        //await adminPage.successfulMessage.waitFor({state:"visible"})
        //expect(await adminPage.successfulMessage).toBeTruthy()
    })
    test("Add  invalid Job Titles", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.getJobtitles()
        await adminPage.addButton.click()
        await adminPage.fillJobTitle("Account Assistant")
        //await adminPage.saveButton.click()
        expect(await adminPage.alreadyExistMeggase).toBeTruthy()
    })
    test("Find valid card of a user", async ({ page }) => {
        const username = "Admin"
        const adminPage = new AdminPage(page)
        await page.waitForTimeout(1000)
        await adminPage.loadingSpinner.waitFor({ state: 'hidden' })
        await adminPage.findUser(username)
        // expect(await adminPage.findUser(username)).toBeTruthy()
        await adminPage.loadingSpinner.waitFor({ state: 'hidden' })
        await page.screenshot({ path: 'test-results/picture/card.png', fullPage: true })
    })
    test("Find Invalid card of a user", async ({ page }) => {
        const username = "Adolf"
        const adminPage = new AdminPage(page)
        await page.waitForTimeout(1000)
        await adminPage.loadingSpinner.waitFor({ state: 'hidden' })
        expect(await adminPage.findUser(username)).toBeFalsy()
        await adminPage.loadingSpinner.waitFor({ state: 'hidden' })
        await page.screenshot({ path: 'test-results/picture/card.png', fullPage: true })
    })
})