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
    readonly successfulMessage: Locator
    readonly alreadyExistMeggase: Locator
    readonly mobileAdminDropDown: Locator
    readonly employeeTextBox: Locator
    readonly invalidMessage: Locator
    readonly essRoleOption: Locator
    readonly resetButton: Locator
    readonly statusMenu: Locator
    constructor(page: Page) {
        this.page = page;
        this.UsernameField = page.locator("//label[text()='Username']/following::input[1]")
        //this.searchButton = page.locator('button[type="submit"]');
        this.searchButton = page.getByRole("button", { name: 'Search' })
        this.RecordsCards = page.locator('.oxd-table-card')
        this.dataRows = page.locator(".oxd-table-card")
        this.UserRoleMenu = page.locator(".oxd-select-text-input").nth(0)
        this.statusMenu = page.locator(".oxd-select-text-input").nth(1)
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
        this.alreadyExistMeggase = page.getByText("Already exists")
        this.invalidMessage = page.getByText("Invalid")
        this.mobileAdminDropDown = page.getByRole('button').nth(2)
        this.employeeTextBox = page.locator(".oxd-autocomplete-text-input--active")
        this.essRoleOption = page.getByRole('button', ({ name: 'ESS' }))
        this.resetButton = page.getByRole('button', ({ name: 'Reset' }))
        // <p data-v-7b563373="" data-v-35c8fe09="" class="oxd-text oxd-text--p oxd-text--toast-message oxd-toast-content-text">Successfully Saved</p> 
        // aka getByText('Successfully Saved')
    }
    async fillUserName(username: string): Promise<void> {
        await this.UsernameField.waitFor({ state: 'visible' });
        await this.UsernameField.fill(username);
        await this.searchButton.waitFor({ state: 'visible' });
        // await this.searchButton.press('Enter')
        await this.searchButton.click()
    }

    async clickStatusDropDown(optionName: string): Promise<void> {
        await this.statusMenu.waitFor({ state: 'visible' })
        await this.statusMenu.click()
        //const button=await this.page.getByRole('button',({name:`${optionName}`}))
        await this.page.getByRole('button', ({ name: `${optionName}` })).click()
    }
    async fillEmployeeName(username: string): Promise<void> {
        await this.UsernameField.waitFor({ state: 'visible' });
        await this.UsernameField.fill(username);
        await this.page.getByRole('option', { name: 'Searching...' }).waitFor({ state: 'hidden' })
        await this.page.getByRole('option').first().click()
        await this.searchButton.waitFor({ state: 'visible' });
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

    async getRecordsNumber(): Promise<number> {
        const text = await this.page.locator('span.oxd-text--span').nth(12).innerText();
        // Extract number
        const number = Number(text.match(/\d+/)?.[0]);

        console.log(number); // 54
        return number
    }

    async compareRecords(): Promise<boolean> {
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        await this.dataRows.first().waitFor()
        const count = await this.dataRows.count();
        console.log("Number of records: ", count)
        const textRecord = await this.getRecordsNumber()
        console.log("Number of text record: ", textRecord)
        if (await textRecord === count) {
            console.log("The record are the same")
            return true
        } else {
            return false
        }
    }
    async clickAdminDropdown(): Promise<void> {
        await this.UserRoleMenu.waitFor({ state: 'visible' });
        await this.UserRoleMenu.click()
        await this.AdminRole.waitFor({ state: 'visible' });
        await this.AdminRole.click()
    }
    async clickESSDropdown(): Promise<void> {
        await this.UserRoleMenu.waitFor({ state: 'visible' });
        await this.UserRoleMenu.click()
        await this.essRoleOption.waitFor({ state: 'visible' });
        await this.essRoleOption.click()
    }
    async clickSearchButton(): Promise<void> {
        await this.searchButton.waitFor({ state: 'visible' });
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
    }

    async fillRandomJobTitles(user: UserProfile): Promise<void> {
        await this.page.waitForTimeout(2000)
        await this.jobTitleField.waitFor({ state: 'visible' })
        await this.jobTitleField.fill(user.jobTitle)
        // await this.saveButton.click()
        await this.successfulMessage.waitFor({ state: 'visible' })
    }

    getUserCard(user: string) {
        const rows = this.page.locator(
            '.oxd-table-body .oxd-table-row'
        );

        const targetRow = rows.filter({
            has: this.page.locator(
                '.oxd-table-cell'
            ).filter({
                hasText: new RegExp(
                    `^${user.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`
                )
            }).first()
        });

        return targetRow
    }


    getUserName(user: string) {
        const rows = this.page.locator('.oxd-table-body .oxd-table-row');

        const card = rows.filter({
            has: this.page.locator('.header', {
                hasText: /^Username$/
            })
        }).filter({
            has: this.page.locator('.data', {
                hasText: new RegExp(`^${user}$`)
            })
        });
        return card
    }
    async findUser(employeeName: string): Promise<boolean> {

        const targetRow = this.getUserCard(employeeName)
        console.log()
        const numberOfRows = await targetRow.count()
        console.log(`There are ${numberOfRows} matching card`)
        if (numberOfRows === 0) {
            console.log(`There are no user with the name: ${employeeName}`)
            return false
        } else {
            console.log(`There are a user with the name: ${employeeName}`)
            for (let i = 0; i < numberOfRows; i++) {
                await targetRow.nth(i).highlight();
            }
            return true
        }

    }
    async findFirstUserDeleteButton(employeeName: string) {

        const targetRow = this.getUserCard(employeeName)
        console.log('Target row:', await targetRow.count());

        const DeleteButton = targetRow.locator(
            'button:has(.bi-trash)'
        ).first();

        console.log('Edit button:', await DeleteButton.count());

        await DeleteButton.click();
    }
    async findFirstUserEditButton(employeeName: string) {

        const targetRow = this.getUserCard(employeeName)
        console.log('Target row:', await targetRow.count());

        const editButton = targetRow.locator(
            'button:has(.bi-pencil-fill)'
        ).first();

        console.log('Edit button:', await editButton.count());

        await editButton.click();
    }

    // async checkSuccesful():Promise<boolean>{
    //     await this.successfulMessage.waitFor({state:'visible'})
    //     return true
    // }
    //  async checkInvalid():Promise<boolean>{
    //     await this.errorResult.waitFor({state:'visible'})
    //     return true
    // }
    //   await locator.evaluate((element) => {
    //     //them vien do xung quanh element
    //     (element as HTMLElement).style.outline = "4px solid red";
    //     //Them background mau vang cho element
    //     (element as HTMLElement).style.backgroundColor = "yellow";
    // })
}


