import { test, expect } from "@playwright/test";
import { ClaimPage } from "../pages/ClaimPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
test.describe("Assign Claim", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.adminLogin()
        await page.waitForURL("**/dashboard/**", { timeout: 20000 })
        await page.waitForTimeout(5000)
        const homePage = new HomePage(page);
        await homePage.clickItemOnMenu("Claim")
        //await page.waitForURL("**/claim/**", {timeout:60000})
    })
    test("Find Invalid employee Claim", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        //await claimPage.assignClaimButton.click()
        //format yyyy-dd-mm
        await claimPage.filldate("2026-02-11")
        await claimPage.fillEmployeeTextBox("John Smith")
        await claimPage.clickSearchButton()
        expect(claimPage.errorResult.isVisible()).toBeTruthy()
        await page.waitForTimeout(5000)
    })
    test("Find Valid employee Claim", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        //await claimPage.assignClaimButton.click()
        //format yyyy-dd-mm
        // await claimPage.filldate("2026-02-11")
        await claimPage.fillEmployeeTextBox("Thomas Kutty Benny")
        await claimPage.clickSearchButton()
        await expect(claimPage.errorResult).not.toBeVisible();
        expect(claimPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(5000)
    })
})