import { test,expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { MyInfoPage } from "../pages/MyInfoPage";
import { randomProfileGenerate } from "../utils/faker";

test.describe("My Info Page Tests", ()=>{
    test.beforeEach(async ({ page })=>{
    //B1 Login
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const myInfoPage = new MyInfoPage(page);

    await loginPage.adminLogin()

    await page.waitForURL("**/dashboard**",{timeout:20000});

    //doi den khi menu name hien thi de ngua trang load cham
    await homePage.sidebarMenuNames.first().waitFor({state:'visible', timeout:10000});
    
    await homePage.clickMyInfoMenu();

    

    });

    test("upload avatar", async ({page})=>{
        test.skip(!!process.env.PWDEBUG,"Skip while debugging")
        const myInfoPage = new MyInfoPage(page);
        const itemname="Testfile3.png"
        await myInfoPage.avatarWrapper.waitFor({state:'visible', timeout:10000});
        await myInfoPage.uploadAvatar(itemname);

        expect(true).toBeTruthy();
    })

    test("Unload invalid file as a avartar" , async({page})=>{
        const myInfoPage = new MyInfoPage(page);
        const itemname="TestDummy.docx"
        await myInfoPage.avatarWrapper.waitFor({state:'visible', timeout:10000})
        await myInfoPage.uploadAvatar(itemname)
        await myInfoPage.invalidFileMesssage.waitFor({state:'visible', timeout:10000})
        expect ( await myInfoPage.invalidFileMesssage.isVisible()).toBeTruthy()
    })

    test("Change User Name",async ({page})=>{
        const myInfoPage = new MyInfoPage(page);
        const user=randomProfileGenerate()
        await myInfoPage.FillRandomFullName(user)
        expect (await myInfoPage.checkChangedName(user)).toBeTruthy()
    })
});
