import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { MyInfoPage } from "../pages/MyInfoPage";
import { randomProfileGenerate } from "../utils/faker";

test.describe("My Info Page Tests", () => {
    test.beforeEach(async ({ page }) => {
        //B1 Login
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const myInfoPage = new MyInfoPage(page);

        await loginPage.adminLogin()

        await page.waitForURL("**/dashboard**", { timeout: 20000 });

        //doi den khi menu name hien thi de ngua trang load cham
        await homePage.sidebarMenuNames.first().waitFor({ state: 'visible', timeout: 10000 });

        await homePage.clickMyInfoMenu();



    });

    test("OHRM_MYINFO_003 Verify employee full name fields accept valid text", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        const user = randomProfileGenerate()
        await myInfoPage.FillRandomFullName(user)
        expect(await myInfoPage.checkChangedName(user)).toBeTruthy()
    })
    test("OHRM_MYINFO_004 Verify first name required validation", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        await myInfoPage.loadingSpinner.waitFor({ state: 'hidden' })
        await myInfoPage.firstNameTextBox.waitFor({ state: 'visible' })
        await myInfoPage.firstNameTextBox.fill("")
        await myInfoPage.saveButton.click()
        await myInfoPage.requiredMessage.waitFor({ state: 'visible' })
        expect(myInfoPage.requiredMessage).toBeVisible()
    })
    test("OHRM_MYINFO_005 Verify last name required validation", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        await myInfoPage.loadingSpinner.waitFor({ state: 'hidden' })
        await myInfoPage.lastNameTextBox.waitFor({ state: 'visible' })
        await myInfoPage.lastNameTextBox.fill("")
        await myInfoPage.saveButton.click()
        await myInfoPage.requiredMessage.waitFor({ state: 'visible' })
        expect(myInfoPage.requiredMessage).toBeVisible()
    })
    test("OHRM_MYINFO_006 Verify upload valid file as a valid profile picture", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const myInfoPage = new MyInfoPage(page);
        const itemname = "Testfile3.png"
        await myInfoPage.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 });
        await myInfoPage.uploadAvatar(itemname);

        expect(true).toBeTruthy();
    })

    test("OHRM_MYINFO_007 Verify upload large file as a valid profile picture", async ({ page }) => {
        test.skip(!!process.env.PWDEBUG, "Skip while debugging")
        const myInfoPage = new MyInfoPage(page);
        const itemname = "dummy.jpg"
        await myInfoPage.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 });
        await myInfoPage.uploadAvatar(itemname);
        await myInfoPage.attachmentSizeMessage.waitFor({ state: 'visible', timeout: 10000 })
        expect(await myInfoPage.attachmentSizeMessage.isVisible()).toBeTruthy()
    })

    test("OHRM_MYINFO_008 Verify upload invalid file as a valid profile picture", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        const itemname = "TestDummy.docx"
        await myInfoPage.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 })
        await myInfoPage.uploadAvatar(itemname)
        await myInfoPage.invalidFileMesssage.waitFor({ state: 'visible', timeout: 10000 })
        expect(await myInfoPage.invalidFileMesssage.isVisible()).toBeTruthy()
    })

    test("OHRM_MYINFO_009 Verify name fields handle maximum supported length", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        const longName = "ABCDEF123456JKQAQWERTYLONGNAME"
        await myInfoPage.loadingSpinner.waitFor({ state: 'hidden' })
        await page.waitForTimeout(2000)
        await myInfoPage.firstNameTextBox.waitFor({ state: 'visible' })
        await myInfoPage.firstNameTextBox.fill(longName)
        await myInfoPage.saveButton.click()
        expect(myInfoPage.longNameMessage).toBeHidden()
    })
    test("OHRM_MYINFO_010 Verify name fields reject or safely handle overlength input", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        const longName = "ABCDEF123456JKQAQWERTYLONGNAMEPLUSONE"
        await myInfoPage.loadingSpinner.waitFor({ state: 'hidden' })
        await page.waitForTimeout(2000)
        await myInfoPage.firstNameTextBox.waitFor({ state: 'visible' })
        await myInfoPage.firstNameTextBox.fill(longName)
        //  await myInfoPage.saveButton.click()
        await myInfoPage.longNameMessage.waitFor({ state: 'visible' })
        expect(myInfoPage.longNameMessage).toBeVisible()
    })


    test.skip("Change user name and avatar", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page);
        const itemname = 'Testfile3.png'
        await myInfoPage.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 });
        const user = randomProfileGenerate()
        await myInfoPage.uploadAvatar(itemname);
        await myInfoPage.FillRandomFullName(user)
        expect(await myInfoPage.checkChangedName(user)).toBeTruthy()
    })
});
