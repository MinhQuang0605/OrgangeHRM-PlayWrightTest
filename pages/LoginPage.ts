import {Page, Locator} from '@playwright/test';

export class LoginPage{
    //locator

    readonly page: Page; //Page object giup tuong tac voi trinh duyet
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly homeTitle: Locator; //verify login thanh cong

    constructor(page:Page){
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.homeTitle = page.locator('h1.home-title');

    }

    async login(username: string, password: string): Promise<void> {
        //B1: Navigate vao login page
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        //B2: fill username vao input
        await this.usernameInput.fill(username);
        //B3: fill password vao input
        await this.passwordInput.fill(password);
        //B4: click login button
        await this.loginButton.click();

    }
    //function: login, validate

    async isLoginSuccessful(): Promise<boolean> {
        //case 1: test URl co /dashboard hay khong
        let url = this.page.url();
        return url.includes('/dashboard');
        
    }
}
