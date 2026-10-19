// private final By sidebarMenuItems = By.cssSelector(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
//     private final By sidebarMenuNames = By.cssSelector(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");

//     private final By hambugerMenu = By.cssSelector(".oxd-topbar-header-hamburger");
//     private final By dashboardTitle = By.cssSelector(".oxd-topbar-header-breadcrumb-module");
//     private final By sidebarPanel = By.cssSelector(".oxd-sidepanel");
//     private final By headerMenu = By.cssSelector(".oxd-topbar-header");
import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    //Locator
    readonly sidebarMenuItems: Locator;
    readonly sidebarMenuNames: Locator;
    readonly searchField: Locator;
    readonly itemLabel: Locator;
    readonly quickLauchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebarMenuItems = page.locator(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
        this.sidebarMenuNames = page.locator(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");
        this.searchField = page.getByRole("textbox", { name: 'Search' })
        this.itemLabel = page.getByLabel("")
        this.quickLauchButton = page.locator(".orangehrm-quick-launch-icon")
    }

    //Lay danh sach ten cac menu trong sidebar
    async getSideBarMenuItems(): Promise<string[]> {
        //Dem so luong locator sau khi tim
        //=> dung trong vong lap for
        const count = await this.sidebarMenuNames.count();
        //tao bien luu cac menu names
        const menuNames: string[] = [];


        //B3 lap qua tung locator de lay tezt
        for (let i = 0; i < count; i++) {
            //lay locator thu i => nth(i).textContent()
            const name = await this.sidebarMenuNames.nth(i).textContent();
            if (name) {
                //do typescript khong biet name co null hay khong nen can kiem tra
                menuNames.push(name);
            }
        }
        return menuNames;
    }

    async getQuickLaunchButton(): Promise<string[]> {
        await this.quickLauchButton.first().waitFor({ state: 'visible' })
        const count = await this.quickLauchButton.count();
        const buttonName: string[] = [];

        for (let i = 0; i < count; i++) {
            const title = await this.quickLauchButton.nth(i).getAttribute("title");
            if (title) {
                buttonName.push(title);
            }
        }
        // console.log(buttonName)
        return buttonName;
    }

    async clickQuickLauchButton(buttonName: string): Promise<void> {
        const count = await this.quickLauchButton.count();
        for (let i = 0; i < count; i++) {
            const title = await this.quickLauchButton.nth(i).getAttribute("title");
            if (title === buttonName) {
                await this.quickLauchButton.nth(i).click()
                return;
            }
        }
    }
    async clickMyInfoMenu(): Promise<void> {
        // await this.page.getByRole("link", { name: "My Info" }).click();
        //    await this.sidebarMenuItems.isVisible()
        const count = await this.sidebarMenuNames.count();
        //duyet tung menu name neu tim thay My Info thi click va ket thuc vong lap
        for (let i = 0; i < count; i++) {
            const name = await this.sidebarMenuNames.nth(i).textContent();
            if (name === "My Info") {
                //tim the a
                // let link = this.sidebarMenuNames.nth(i).locator('xpath=./ancestor::a');
                // console.log("Xpath link: " + link);
                await this.sidebarMenuNames.nth(i).locator('xpath=./ancestor::a').click();
                // await this.sidebarMenuItems.nth(i).click();
                // this.page.waitForTimeout(2000);
                return;
            }
        }
    }
    async clickItemOnMenu(Itemname: String): Promise<void> {
        // await this.page.getByRole("link", { name: "My Info" }).click();
        const count = await this.sidebarMenuNames.count();
        //duyet tung menu name neu tim thay My Info thi click va ket thuc vong lap
        for (let i = 0; i < count; i++) {
            const name = await this.sidebarMenuNames.nth(i).textContent();
            if (name === Itemname) {
                //tim the a
                // let link = this.sidebarMenuNames.nth(i).locator('xpath=./ancestor::a');
                // console.log("Xpath link: " + link);
                await this.sidebarMenuNames.nth(i).locator('xpath=./ancestor::a').click();
                // await this.sidebarMenuItems.nth(i).click();
                // this.page.waitForTimeout(2000);
                return;
            }
        }
    }
    async searchItemOnMenu(ItemName: string): Promise<void> {
        await this.searchField.isVisible()
        await this.searchField.fill(ItemName)
    }

    async verifySideBarMenuPath(): Promise<boolean> {
    const count = await this.sidebarMenuNames.count();
    const menuNames: string[] = [];
    //await this.page.waitForTimeout(3000);
    // Capture all menu names before navigating
    for (let i = 0; i < count; i++) {
        const name = await this.sidebarMenuNames.nth(i).textContent();

        if (!name?.trim()) {
            return false;
        }

        menuNames.push(name.trim().toLowerCase());
    }

    // Verify each menu item's navigation
    for (let i = 0; i < count; i++) {
        const menuItem = this.sidebarMenuNames.nth(i);
        const link = menuItem.locator('xpath=./ancestor::a');

        try {
            await link.click();

            const text = menuNames[i];

            await this.page.waitForURL(
                url => url.href.toLowerCase().includes(text),
                { timeout: 5000 }
            );
        } catch (e) {
            console.error(`Navigation failed for menu: ${menuNames[i]}`, e);
            return false;
        }
    }

    return true;
}
}