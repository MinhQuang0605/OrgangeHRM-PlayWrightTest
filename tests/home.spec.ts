import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { time } from 'node:console';

test.describe("Home Page Tests", () => {
  //setup moi truong
  //login voi account
  //go to home page
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    //Login
    await loginPage.adminLogin()
    //Doi den khi trang home xuat hien => check url cua trang home "/Dashboard"
    //** la khong quan tam gia tri truoc do la gi
    await page.waitForURL("**/dashboard**", { timeout: 20000 });

    //doi den khi menu item hien thi
    await homePage.sidebarMenuItems.first().waitFor({ timeout: 20000 });
  });

  test("OHRM_DASH_003	Verify all visible navigation entries are displayed", async ({ page }) => {
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

  test("OHRM_DASH_004	Verify navigation menu can be collapsed and expanded", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.collapsedButton.waitFor({ state: 'visible' })
    await homePage.collapsedButton.click()
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
  test("OHRM_DASH_011	Verify all Quick Launch shortcuts are displayed", async ({ page }) => {
    const homePage = new HomePage(page);
    const menuButtons = await homePage.getQuickLaunchButton();
    //console.log("Number of buttons: ", menuButtons.length);
    expect(menuButtons.length).toBeGreaterThan(0)
  })
  test("OHRM_DASH 012-017 Click Side bar menu button", async ({ page }) => {
    const homePage = new HomePage(page);
    expect(homePage.verifySideBarMenuPath()).toBeTruthy()
  })

  test("OHRM_DASH 002 Verify page title is displayed", async ({ page }) => {
    const homePage = new HomePage(page)
    expect(homePage.findDashBoardHeader("Dashboard")).toBeTruthy
  })

  test("OHRM_DASH_005	Verify the Search navigation entry opens search functionality", async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.searchItemOnMenu("Admin")
    const menuItems = await homePage.getSideBarMenuItems();
    console.log("Sidebar Menu Items: ", menuItems);
    expect(menuItems.length).toBeGreaterThan(0);
    //menu item co chua cac gia tri mong muon
    expect(menuItems).toContain("Admin");
  })
  test(`OHRM_DASH_008	Verify user action control when clicked into icon button`, async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.clockIconButton.waitFor({ state: "visible" })
    await homePage.clockIconButton.click();
    await page.waitForURL("**/attendance/**", { timeout: 20000 });
  })
});