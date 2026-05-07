import {test, expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'
import { LoginPage } from '../pages/LoginPage'

test.describe("Admin Page test", ()=>{
    test.beforeEach(async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.login("Admin", "admin123");
        await page.waitForURL("**/dashboard/**", {timeout:10000})
        const homePage = new HomePage(page);
        await homePage.sidebarMenuNames.first().waitFor({state:'visible', timeout:10000});
        await homePage.clickItemOnMenu("Admin");
        await page.waitForTimeout(1000)
    });

    test("Fill Username with valid value ", async ({page})=>{
        let value="Admin"
        const adminPage = new AdminPage(page);
        adminPage.fillUserName(value);
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        await page.waitForTimeout(1000)
        expect(adminPage.employeeRow(value)).toBeTruthy
         await page.waitForTimeout(10000)
    })
    test("Fill Username with invalid value ", async ({page})=>{
        let value="Admin123"
        const adminPage = new AdminPage(page);
        adminPage.fillUserName(value);
        //await page.getByPlaceholder('Type for hints...').fill('manda')
        await page.waitForTimeout(1000)
        expect(adminPage.employeeRow(value)).toBeTruthy
         await page.waitForTimeout(10000)
    })
})