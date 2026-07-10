import { Page, Locator } from '@playwright/test'
import { hightlightAndScreenshot } from '../utils/screenshot';
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
    readonly errorResult:Locator
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
        this.ErrorMessageResult= this.toast.locator('.oxd-toast-message').first()
        this.errorResult= page.locator('oxd-input-field-error-message').getByText('invalid')
        // this.ErrorMessageResult = this.toast.locator('.oxd-toast-content-text');
        //this.ErrorMessageResult = page.getByRole('alert',{name:'No records Found'})
        //this.notifications = page.locator(".oxd-table-")
    }
    async fillUserName(username: string): Promise<void> {
        await this.UsernameField.isVisible()
        await this.UsernameField.fill(username);
        await this.searchButton.isVisible()
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
        const count = await this.dataRows.count();
        await console.log("Number of records: ", count)
        return await this.dataRows.count();
    }
}
// await page.locator(".dropdown").click();

// const options = page.locator(".dropdown-option");

// const count = await options.count();

// for (let i = 0; i < count; i++) {
//     const text = await options.nth(i).textContent();

//     if (text?.trim() === "Admin") {
//         await options.nth(i).click();
//         break;
//     }
// }
//<input data-v-1f99f73c="" class="oxd-input oxd-input--active">