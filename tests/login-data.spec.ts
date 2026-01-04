import { test, expect } from '@playwright/test';
import { LoginData, readDataFromCSV } from '../utils/csvreader';
import { LoginPage } from '../pages/LoginPage';

//Doc file csv
const testData: LoginData[] = readDataFromCSV()
console.log(`Da load ${testData.length} dong du lieu tu file csv`);

test.describe('Login data using csv file', () => {
   for(let data of testData) {
    test(`${data.description}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(data.username, data.password);
        const isSuccess = await loginPage.isLoginSuccessful();
        if(data.expected_result === 'success') {
        expect(isSuccess).toBe(true);
        //expect(isSuccess).resolves.toBeTruthy();
        }
        else{
            expect(isSuccess).toBe(false);
            //expect(isSuccess).resolves.toBeFalsy();
        }
   })
    }
})