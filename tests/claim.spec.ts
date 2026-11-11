import { test, expect } from "@playwright/test";
import { ClaimPage } from "../pages/ClaimPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

test.describe("Claim page test", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.adminLogin()
        await page.waitForURL("**/dashboard/**", { timeout: 40000 })
        await page.waitForTimeout(5000)
        const homePage = new HomePage(page);
        await homePage.clickItemOnMenu("Claim")
        //await page.waitForURL("**/claim/**", {timeout:60000})
    })
    test.fail("OHRM_CLAIM_003 Search using an exact existing employee name", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        await claimPage.fillEmployeeTextBox("John Smith")
       //await claimPage.clickDropDown("Accommodation")
        await claimPage.clickSearchButton()
        expect(claimPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(5000)
    })
     test("OHRM_CLAIM_005 Search with a Employee Name hat does not exist", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        await claimPage.fillEmployeeTextBox("John Smith")
        await claimPage.clickSearchButton()
        expect(claimPage.errorResult).toBeVisible()
        await page.waitForTimeout(5000)
    })
    test("OHRM_CLAIM_004 Search using a partial Employee Name", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        const validName= await claimPage.getCurrentUserName()
        //await claimPage.assignClaimButton.click()
        //format yyyy-dd-mm
        // await claimPage.filldate("2026-02-11")
        await claimPage.fillEmployeeBySuggestion(validName)
        await claimPage.clickSearchButton()
        //await expect(claimPage.errorResult).not.toBeVisible();
        await expect(claimPage.errorResult).toBeHidden();
        expect(claimPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(5000)
    })
    test("OHRM_CLAIM_006 Search by employee name using autocomplete", async ({ page }) => {
        const claimPage = new ClaimPage(page)
        const validName= await claimPage.getCurrentUserName()
        await claimPage.fillEmployeeBySuggestion(validName)
        await claimPage.clickSearchButton()
        await expect(claimPage.errorResult).toBeHidden();
        expect(claimPage.searchResult()).toBeTruthy()
        await page.waitForTimeout(5000)
    })
    test("OHRM_CLAIM_038 Create a Claim with valid required information",async({page})=>{
        const claimPage = new ClaimPage(page)
        const eventName ="Travel Allowance"
        const currency="United States Dollar"
        await claimPage.assignClaimButton.click()
        await claimPage.fillEmployeeBySuggestion("Ed")
        await claimPage.clickEventComboBox(eventName)
        await claimPage.clickCurrencyDropDown(currency)
        const date= new Date();
        const today=[
            date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),
            String(date.getDate()).padStart(2,"0"),
        ].join("-")
        const message=`automation test ${today}`
        await claimPage.claimMessage.fill(message)
    })
})