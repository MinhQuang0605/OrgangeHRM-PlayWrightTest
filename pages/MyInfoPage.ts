// private final By avatarWrapper = By.cssSelector(".orangehrm-edit-employee-image-wrapper");
// private  final By uploadBtn = By.cssSelector("button.employee-image-action");
// private final By fileInput = By.cssSelector("input[type='file']");
import { Page, Locator } from '@playwright/test';
import { join } from 'node:path';
import { UserProfile } from '../utils/faker';
import { hightlightElement } from '../utils/screenshot';

export class MyInfoPage {
    readonly page: Page;

    //Locator
    readonly avatarWrapper: Locator;
    readonly uploadBtn: Locator
    readonly fileInput: Locator;
    readonly firstNameTextBox: Locator
    readonly lastNameTextBox: Locator
    readonly middleNameTextBox: Locator
    readonly saveButton: Locator
    readonly fullNameText: Locator
    readonly loadingSpinner: Locator

    constructor(page: Page) {
        this.page = page;
        this.avatarWrapper = page.locator(".orangehrm-edit-employee-image-wrapper");
        this.uploadBtn = page.locator("button.employee-image-action");
        this.fileInput = page.locator("input[type='file']");
        this.firstNameTextBox = page.locator(".orangehrm-firstname")
        this.lastNameTextBox = page.locator(".orangehrm-lastname")
        this.middleNameTextBox = page.locator(".orangehrm-middlename")
        this.saveButton = page.getByRole('button', { name: 'save' }).nth(0)
        this.fullNameText = page.locator("h6.oxd-text--h6.--strong");
        this.loadingSpinner = page.locator(".oxd-loading-spinner-container").first()
    }

    //handle upload avatar
    async uploadAvatar(): Promise<void> {
        //click vao avater
        //doi toi khi avatar hien thi
        await this.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 });
        await this.avatarWrapper.click();
        await this.page.waitForTimeout(2000);

        //click vao nut upload
        await this.uploadBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.uploadBtn.click();
        await this.page.waitForTimeout(2000);

        //chon hinh va upload hinh
        await this.fileInput.waitFor({ state: 'attached', timeout: 10000 });
        const filePath = join(__dirname, "..", "data/pics", "TestFile.png")
        await this.fileInput.setInputFiles(filePath);
        await this.page.waitForTimeout(5000);


    }
    async FillRandomFullName(user: UserProfile): Promise<void> {
        await this.page.waitForTimeout(3000);
       // await this.loadingSpinner.waitFor({ state: 'visible' });
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        await this.firstNameTextBox.waitFor({ state: 'visible' });
        await this.middleNameTextBox.waitFor({state: 'visible'})
        await this.lastNameTextBox.waitFor({state: 'visible'})

        await this.firstNameTextBox.fill(user.firstName)
        await this.middleNameTextBox.fill(user.middleName)
        await this.lastNameTextBox.fill(user.lastName)

        await this.saveButton.isVisible()
        await this.saveButton.click()
    }

    async checkChangedName(user: UserProfile): Promise<boolean> {
        await this.page.reload()
        await this.loadingSpinner.waitFor({ state: 'visible' });
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        await this.page.waitForTimeout(3000);
        await this.fullNameText.waitFor({ state: "visible" });
        const fullName = user.firstName + " " + user.lastName;
        const trueFullName = user.firstName + " " + user.middleName + " " + user.lastName
        // await this.firstNameTextBox.isVisible()
        // await this.middleNameTextBox.isVisible()
        // await this.lastNameTextBox.isVisible()

        // const firstName= this.firstNameTextBox.inputValue()
        // const middleName = this.middleNameTextBox.inputValue()
        // const lastName = this.lastNameTextBox.inputValue()

        // console.log('Full name: ', firstName, middleName, lastName)
        // if(user.firstName===await firstName && user.middleName === await middleName && user.lastName === await lastName)
        //     return true
        const currentFullName = await this.fullNameText.textContent();
        console.log("Name intend to change", trueFullName)
        console.log("Current name on web page: ", currentFullName)
        if (fullName === currentFullName) {
            return true
        }
        return false
    }
}