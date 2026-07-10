import { Page, Locator } from "@playwright/test";

export class ClaimPage {
    readonly page: Page;
    readonly employeeClaimButton: Locator
    readonly assignClaimButton: Locator
    readonly beginDateTime: Locator
    readonly searchButton: Locator
    readonly employeeTextBox: Locator
    readonly errorResult: Locator;
    readonly recordCards:Locator

    constructor(page: Page) {
        this.page = page;
        this.employeeClaimButton = page.getByText("Employee Claims")
        this.assignClaimButton = page.getByRole('link', { name: 'Assign Claim' })
        this.searchButton = page.getByRole('button', { name: 'Search' })
        this.beginDateTime = page.getByRole('textbox', { name: "yyyy-dd-mm" }).nth(0)
        this.employeeTextBox = page.getByRole('textbox', { name: "Type for hints..." }).nth(0)
        this.errorResult = page.locator('oxd-input-field-error-message').getByText('invalid')
        this.recordCards = page.locator(".oxd-table-card")
    }

    async filldate(beginDate: string): Promise<void> {
        await this.beginDateTime.isVisible()
        await this.beginDateTime.fill(beginDate)
    }
    async clickSearchButton() {
        await this.searchButton.isVisible()
        await this.searchButton.click()
    }
    async fillEmployeeTextBox(employeeName: string) {
        await this.employeeTextBox.isVisible()
        await this.employeeTextBox.fill(employeeName)
    }
     async searchResult(): Promise<boolean> {
        await this.recordCards.first().waitFor()
        const count = await this.recordCards.count();
        console.log("Number of records: ", count)
        return count > 0;
    }
    // async searchResult(): Promise<boolean>{
    //     await this.searchResult.first().waitFor()
    //     const count = await this.searchResult.count()
    //     return count>0
    // }
}