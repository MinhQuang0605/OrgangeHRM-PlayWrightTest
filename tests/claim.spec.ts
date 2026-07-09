import { test, Expect } from "@playwright/test";
import { ClaimPage } from "../pages/ClaimPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
test.describe("Assign Claim", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login("Admin", "admin123")
        await page.waitForURL("**/dashboard/**", { timeout: 20000 })
        await page.waitForTimeout(5000)
        const homePage = new HomePage(page);
        await homePage.clickItemOnMenu("Claim")
        //await page.waitForURL("**/claim/**", {timeout:60000})
    })
    test("Find Valid employee Claim", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        //await claimPage.assignClaimButton.click()
        await claimPage.filldate("11-02-2026")
        await page.waitForTimeout(5000)
    })
})