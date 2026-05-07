import { Page, Locator } from '@playwright/test'
import { hightlightAndScreenshot } from '../utils/screenshot';
export class AdminPage {
    readonly page: Page;

    //locator
    readonly UsernameField: Locator;
    readonly searchButton: Locator
    readonly RecordsCards: Locator
    //class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"
    constructor(page: Page) {
        this.page = page;
        this.UsernameField = page.locator("//label[text()='Username']/following::input[1]")
        this.searchButton = page.locator('.oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space')
        this.RecordsCards = page.locator('.oxd-table-card')
    }
    async fillUserName(username: string): Promise<void> {
        this.UsernameField.isVisible
        await this.UsernameField.fill(username);
        this.searchButton.click
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
}
//<input data-v-1f99f73c="" class="oxd-input oxd-input--active">