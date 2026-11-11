import { Page, Locator } from "@playwright/test";

export class ClaimPage {
    readonly page: Page;
    readonly employeeClaimButton: Locator
    readonly assignClaimButton: Locator
    readonly beginDateTime: Locator
    readonly searchButton: Locator
    readonly employeeTextBox: Locator
    readonly errorResult: Locator;
    readonly recordCards: Locator;
    readonly eventNameComboBox: Locator;
    readonly travelAllowance: Locator;
    readonly unitedStateDollar: Locator;
    readonly currencyComboBox: Locator;
    readonly claimMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.employeeClaimButton = page.getByText("Employee Claims")
        this.assignClaimButton = page.getByRole('link', { name: 'Assign Claim' })
        this.searchButton = page.locator('.oxd-button--medium.oxd-button--secondary.orangehrm-left-space')
        this.beginDateTime = page.locator(".oxd-input.oxd-input--active").nth(1)
        //   this.beginDateTime = page.getByRole('textbox', { name: "yyyy-mm-dd" }).nth(0)
        this.employeeTextBox = page.getByRole('textbox', { name: "Type for hints..." }).nth(0)
        this.errorResult = page.locator('.oxd-input-field-error-message').first()
        this.recordCards = page.locator(".oxd-table-card")
        this.eventNameComboBox = page.locator('.oxd-select-text').nth(0)
        this.travelAllowance = page.getByRole('option', { name: 'Travel Allowance' })
        this.unitedStateDollar = page.getByRole('option', { name: 'United States Dollar' })
        this.currencyComboBox = page.locator('.oxd-select-text').nth(1)
        this.claimMessage = page.locator('.oxd-textarea--active')
    }

  async getCurrentUserName(): Promise<string> {
    const element = this.page.locator('.oxd-userdropdown-name');
    // Nếu textContent() null/undefined, actualName sẽ là ""
    const actualName = (await element.textContent())?.trim() ?? ""; 
    
    console.log("Admin name: ", actualName);
    return actualName;
}

    async filldate(beginDate: string): Promise<void> {
        await this.beginDateTime.waitFor({ state: 'visible' })
        await this.beginDateTime.fill(beginDate)
    }
    async clickSearchButton() {
        await this.searchButton.waitFor({ state: 'visible' })
        await this.searchButton.click()
    }
    async fillEmployeeTextBox(employeeName: string) {
        await this.employeeTextBox.isVisible()
        await this.employeeTextBox.fill(employeeName)
    }

    async fillEmployeeBySuggestion(employeeName: string) {
        await this.employeeTextBox.waitFor({ state: 'visible' })
        await this.employeeTextBox.fill(employeeName)
        await this.page.getByRole('option', { name: 'Searching...' }).waitFor({ state: 'hidden' })
        await this.page.getByRole('option').first().click()
    }
    async clickEventComboBox(eventName: string) {
        await this.eventNameComboBox.waitFor({ state: 'visible' })
        await this.eventNameComboBox.click()
        const eventElement = this.page.getByRole('option', { name: `${eventName}` })
        await eventElement.waitFor({ state: 'visible' })
        await eventElement.click()
    }
    async searchResult(): Promise<boolean> {
        // await this.recordCards.isVisible()
        await this.recordCards.first().waitFor({ state: 'visible' })
        const count = await this.recordCards.count();
        console.log("Number of records: ", count)
        return count > 0;
    }

    async clickCurrencyDropDown(option: string): Promise<void> {
        await this.currencyComboBox.waitFor({ state: 'visible' })
        await this.currencyComboBox.click()
        const currencyChoice = this.page.getByRole('option', { name: `${option}` })
        await currencyChoice.waitFor({ state: 'visible' })
        await currencyChoice.click()
    }

    async assignNewClaim() {
        await this.assignClaimButton.waitFor({ state: 'visible' })
        await this.assignClaimButton.click()

    }


    // async searchResult(): Promise<boolean>{
    //     await this.searchResult.first().waitFor()
    //     const count = await this.searchResult.count()
    //     return count>0
    // }
}