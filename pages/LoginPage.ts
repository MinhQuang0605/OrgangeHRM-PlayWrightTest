import {Page, Locator} from '@playwright/test';
import { hightlightAndScreenshot } from '../utils/screenshot';

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
        await this.page.waitForTimeout(3000);
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        //B2: fill username vao input
        await this.usernameInput.fill(username);
        await hightlightAndScreenshot(
            this.page,
            this.usernameInput,
            "Login Test",
            "fill_username"
        )
        //B3: fill password vao input
        await this.passwordInput.fill(password);
  
        await hightlightAndScreenshot(
            this.page,
            this.passwordInput,
            "Login Test",
            "fill_password"
        )
        //B4: click login button
        await hightlightAndScreenshot(
            this.page,
            this.loginButton,
            "Login Test",
            "click_button_login"
        )
        await hightlightAndScreenshot(
            this.page,
            this.usernameInput,
            "Login Test",
            "click_button_login"
        )
        await this.loginButton.click();

        //B5: Chup screenshot ket qua login
        // await hightlightAndScreenshot(
        //     this.page,
        //     this.usernameInput,
        //     "Login Test",
        //     "login_result"
        // )

    }
    //function: login, validate

    async isLoginSuccessful(): Promise<boolean> {
       // await this.page.waitForTimeout(3000);
        //case 1: test URl co /dashboard hay khong
        try{
            await this.page.waitForURL(/.*dashboard/, {timeout: 10000});
            return true;
        }catch(e){
            return false;
        }
    }

    
}
