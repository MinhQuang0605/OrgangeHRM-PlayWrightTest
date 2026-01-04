// private final By sidebarMenuItems = By.cssSelector(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
//     private final By sidebarMenuNames = By.cssSelector(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");

//     private final By hambugerMenu = By.cssSelector(".oxd-topbar-header-hamburger");
//     private final By dashboardTitle = By.cssSelector(".oxd-topbar-header-breadcrumb-module");
//     private final By sidebarPanel = By.cssSelector(".oxd-sidepanel");
//     private final By headerMenu = By.cssSelector(".oxd-topbar-header");
import {Page, Locator} from '@playwright/test';

export class HomePage{
    readonly page: Page;

    //Locator
    readonly sidebarMenuItems: Locator;
    readonly sidebarMenuNames: Locator;

    constructor(page:Page){
        this.page = page;
        this.sidebarMenuItems = page.locator(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
        this.sidebarMenuNames = page.locator(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");
    }

    //Lay danh sach ten cac menu trong sidebar
    async getSideBarMenuItems(): Promise<string[]> {
        //Dem so luong locator sau khi tim
        //=> dung trong vong lap for
        const count = await this.sidebarMenuNames.count();
        //tao bien luu cac menu names
        const menuNames: string[] = [];
 

        //B3 lap qua tung locator de lay tezt
        for(let i=0; i< count; i++){
            //lay locator thu i => nth(i).textContent()
            const name = await this.sidebarMenuNames.nth(i).textContent();
            if(name){
                //do typescript khong biet name co null hay khong nen can kiem tra
                menuNames.push(name);
            }
        }
        return menuNames;
    }

    async clickMyInfoMenu(): Promise<void>{
               // await this.page.getByRole("link", { name: "My Info" }).click();
        const count = await this.sidebarMenuNames.count();
        //duyet tung menu name neu tim thay My Info thi click va ket thuc vong lap
        for(let i=0; i< count; i++){
        const name = await this.sidebarMenuNames.nth(i).textContent();
        if(name === "My Info"){
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
}