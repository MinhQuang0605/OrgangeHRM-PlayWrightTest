import { Page, Locator } from '@playwright/test'
import { hightlightAndScreenshot } from '../utils/screenshot';
import { UserProfile } from '../utils/faker';
export class AdminPage {
    readonly page: Page;

    //locator
    //    await page.locator(".oxd-select-text-input").nth(0).click();
    //     await page.locator("//div[@role='option']//span[text()='Admin']").click();
    readonly UsernameField: Locator;
    readonly searchButton: Locator;
    readonly RecordsCards: Locator;
    readonly dataRows: Locator;
    readonly UserRoleMenu: Locator;
    readonly AdminRole: Locator;
    readonly toast: Locator;
    readonly ErrorMessageResult: Locator;
    readonly errorResult: Locator
    readonly loadingSpinner: Locator
    readonly jobDropDown: Locator
    readonly jobTitlesOption: Locator
    readonly addButton: Locator
    readonly jobTitleField: Locator
    readonly saveButton: Locator
    readonly successfulMessage:Locator
    readonly alreadyExistMeggase:Locator
    //class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"
    constructor(page: Page) {
        this.page = page;
        this.UsernameField = page.locator("//label[text()='Username']/following::input[1]")
        //this.searchButton = page.locator('button[type="submit"]');
        this.searchButton = page.getByRole("button", { name: 'Search' })
        this.RecordsCards = page.locator('.oxd-table-card')
        this.dataRows = page.locator(".oxd-table-card")
        this.UserRoleMenu = page.locator(".oxd-select-text-input").nth(0)
        this.AdminRole = page.locator("//div[@role='option']//span[text()='Admin']")
        this.toast = page.locator('.oxd-toast')
        this.ErrorMessageResult = this.toast.locator('.oxd-toast-message').first()
        this.errorResult = page.locator('oxd-input-field-error-message').getByText('invalid')
        this.loadingSpinner = page.locator(".oxd-loading-spinner-container").first()
        this.jobDropDown = page.locator(".oxd-topbar-body-nav-tab").nth(1)
        this.jobTitlesOption = page.getByRole('listitem').filter({ hasText: /^Job Titles$/ })
        this.addButton = page.getByRole("button", ({ name: 'Add' }))
        this.jobTitleField = page.getByRole("textbox").nth(1)
        this.saveButton = page.getByRole("button", ({ name: 'Save' }))
        this.successfulMessage = page.getByText("Successfully Saved")
        this.alreadyExistMeggase= page.getByText("Already Exist")
        // this.ErrorMessageResult = this.toast.locator('.oxd-toast-content-text');
        //this.ErrorMessageResult = page.getByRole('alert',{name:'No records Found'})
        //this.notifications = page.locator(".oxd-table-")
        // <p data-v-7b563373="" data-v-35c8fe09="" class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text">Successfully Saved</p> 
        // aka getByText('Successfully Saved')
    }
    async fillUserName(username: string): Promise<void> {
        await this.UsernameField.isVisible()
        await this.UsernameField.fill(username);
        await this.searchButton.isVisible()
        // await this.searchButton.press('Enter')
        await this.searchButton.click()
    }

    async employeeRow(name: string): Promise<boolean> {
        if (this.RecordsCards.filter({ hasText: name })) {
            console.log("Name:", name + " Have been found")
            return true
        }

        else {
            console.log("Name:", name + " Have not been found")
            return false
        }
    }
    async searchResult(): Promise<boolean> {
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        await this.dataRows.first().waitFor()
        const count = await this.dataRows.count();
        console.log("Number of records: ", count)
        return count > 0;
    }

    async clickAdminDropdown(): Promise<void> {
        await this.UserRoleMenu.isVisible()
        await this.UserRoleMenu.click()
        await this.AdminRole.isVisible()
        await this.AdminRole.click()
    }
    async clickSearchButton(): Promise<void> {
        await this.searchButton.isVisible()
        await this.searchButton.click()
    }
    async getSearchResultCount(): Promise<number> {
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        const count = await this.dataRows.count();
        await console.log("Number of records: ", count)
        return await this.dataRows.count();
    }

    async getJobtitles(): Promise<void> {
        await this.jobDropDown.waitFor({ state: 'visible' })
        await this.jobDropDown.click()
        await this.jobTitlesOption.waitFor({ state: 'visible' })
        await this.jobTitlesOption.click()
    }

    async fillJobTitle(JobTitle: string): Promise<void> {
        await this.page.waitForTimeout(2000)
        await this.jobTitleField.waitFor({ state: 'visible' })
        await this.jobTitleField.fill(JobTitle)
        await this.saveButton.click()
        await this.successfulMessage.waitFor({state:'visible'})
    }

    async fillRandomJobTitles(user: UserProfile): Promise<void> {
        await this.page.waitForTimeout(2000)
        await this.jobTitleField.waitFor({ state: 'visible' })
        await this.jobTitleField.fill(user.jobTitle)
        await this.saveButton.click()
        await this.successfulMessage.waitFor({state:'visible'})
    }
    
    // async checkSuccesful():Promise<boolean>{
    //     await this.successfulMessage.waitFor({state:'visible'})
    //     return true
    // }
    //  async checkInvalid():Promise<boolean>{
    //     await this.errorResult.waitFor({state:'visible'})
    //     return true
    // }
}


