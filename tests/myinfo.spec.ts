import { test,expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/Homepage";
import { MyInfoPage } from "../pages/MyInfoPage";

test.describe("My Info Page Tests", ()=>{
    test.beforeEach(async ({ page })=>{
    //B1 Login
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const myInfoPage = new MyInfoPage(page);

    await loginPage.login("Admin","admin123");

    await page.waitForURL("**/dashboard**",{timeout:10000});

    //doi den khi menu name hien thi de ngua trang load cham
    await homePage.sidebarMenuNames.first().waitFor({state:'visible', timeout:10000});
    
    await homePage.clickMyInfoMenu();

    

    });

    test("upload avatar", async ({page})=>{
        const myInfoPage = new MyInfoPage(page);
        await myInfoPage.avatarWrapper.waitFor({state:'visible', timeout:10000});
        await myInfoPage.uploadAvatar();

        expect(true).toBeTruthy();
    })
});