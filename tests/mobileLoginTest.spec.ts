import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.ts';

//describe: tao cum test case
test.describe("Mobile Login Tests", ()=>{
    test("Test Login successful on Mobile", async({page})=>{
        await page.setViewportSize({ width: 375, height: 667 }); //iPhone 6/7/8 size
        //Khoi tao LoginPage
        const loginPage = new LoginPage(page);

        await loginPage.login("Admin", "admin123");
        
        await expect(loginPage.isLoginSuccessful()).resolves.toBeTruthy();


    })
    test("Test Login Failed on Mobile", async({page})=>{
        await page.setViewportSize({ width: 375, height: 667 }); //iPhone 6/7/8 size
        const loginPage = new LoginPage(page);
        
        await loginPage.login("Admin", "admin12");
        
        expect(loginPage.isLoginSuccessful()).resolves.toBeFalsy();
       // await loginPage.isLoginSuccessful() ==false; 
    })
})
