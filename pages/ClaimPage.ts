import { Page,Locator } from "@playwright/test";

export class ClaimPage{
    readonly page:Page;
    readonly employeeClaimButton:Locator
    readonly assignClaimButton:Locator
    constructor(page:Page){
        this.page=page;
        this.employeeClaimButton= page.getByText("Employee Claims")
        this.assignClaimButton= page.getByRole('link',{name:'Assign Claim'})
    }
}