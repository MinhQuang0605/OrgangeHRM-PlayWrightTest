import {test,expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { time } from 'node:console';

test.describe("Home Page Tests", ()=>{
    //setup moi truong
    //login voi account
    //go to home page
    test.beforeEach(async({page})=>{
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        //Login
        await loginPage.adminLogin()
        //Doi den khi trang home xuat hien => check url cua trang home "/Dashboard"
        //** la khong quan tam gia tri truoc do la gi
        await page.waitForURL("**/dashboard**", {timeout: 20000});

        //doi den khi menu item hien thi
        await homePage.sidebarMenuItems.first().waitFor({timeout: 20000});
    });

    test("Verify Sidebar Menu Items", async({page})=>{
        const homePage = new HomePage(page);

        const menuItems = await homePage.getSideBarMenuItems();
        console.log("Sidebar Menu Items: ", menuItems);
      //  homePage.getQuickLauchButton()
        //Kiem tra menuitem >0 khong
        expect(menuItems.length).toBeGreaterThan(0);
        //menu item co chua cac gia tri mong muon
        expect(menuItems).toContain("Admin");
        
        await homePage.clickQuickLauchButton("Leave List")
      //  await homePage.clickMyInfoMenu();
        
    });
    test("Verify Quick Lauch Button", async({page})=>{
      const homePage = new HomePage(page);
      const menuButtons=await homePage.getQuickLaunchButton();
      console.log("Number of buttons: ", menuButtons);
      expect(menuButtons.length).toBeGreaterThan(0)
    })
    test("Click Side bar menu button",async({page})=>{
      const homePage= new HomePage(page);
     expect(homePage.verifySideBarMenuPath()).toBeTruthy()
    })
});