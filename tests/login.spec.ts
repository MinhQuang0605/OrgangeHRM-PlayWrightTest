import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.ts';

//describe: tao cum test case
test.describe("Login Tests", ()=>{
    test("Test Login successful", async({page})=>{
        //Khoi tao LoginPage
        const loginPage = new LoginPage(page);

        await loginPage.login("Admin", "admin123");
        
        await expect(loginPage.isLoginSuccessful()).resolves.toBeTruthy();


    })
    test("Test Login Failed", async({page})=>{
        const loginPage = new LoginPage(page);
        
        await loginPage.login("Admin", "admin12");
        
        expect(loginPage.isLoginSuccessful()).resolves.toBeFalsy();
       // await loginPage.isLoginSuccessful() ==false; 
    })
})
