import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'node:console';

//describe: tao cum test case
test.describe("Login Tests", () => {
    test("Test Login successful ", { tag: '@smoke' }, async ({ page }) => {
        //Khoi tao LoginPage
        const loginPage = new LoginPage(page);

        await loginPage.login("Admin", "admin123");

        await expect(loginPage.isLoginSuccessful()).resolves.toBeTruthy();


    })
    test.skip("Test Login Failed", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("Admin", "admin12");

        expect(loginPage.isLoginSuccessful()).resolves.toBeFalsy();
        // await loginPage.isLoginSuccessful() ==false; 
    })
    test("OHRM_LOGIN 011: Verify login page behavior after successful login", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login("Admin", "admin123");

        expect(loginPage.isLoginSuccessful()).resolves.toBeTruthy();
        await loginPage.gotoLoginPage()
        await page.waitForURL("**/dashboard/**", { timeout: 40000 })
        // await loginPage.isLoginSuccessful() ==false; 
    })
})
