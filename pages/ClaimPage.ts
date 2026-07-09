import { Page,Locator } from "@playwright/test";

export class ClaimPage{
    readonly page:Page;
    readonly employeeClaimButton:Locator
    readonly assignClaimButton:Locator
    readonly BeginDateTime:Locator
    readonly searchButton:Locator
    constructor(page:Page){
        this.page=page;
        this.employeeClaimButton= page.getByText("Employee Claims")
        this.assignClaimButton= page.getByRole('link',{name:'Assign Claim'})
        this.searchButton = page.getByRole('button',{name:'Search'})
        this.BeginDateTime = page.getByRole('textbox',{name:"yyyy-dd-mm"}).nth(0)
    }

    async filldate(beginDate:string):Promise<void> {
        await this.BeginDateTime.isVisible()
        await this.BeginDateTime.fill(beginDate)
        await this.searchButton.isVisible()
        await this.searchButton.click()
    }
}