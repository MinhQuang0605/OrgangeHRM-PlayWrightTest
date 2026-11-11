import { test, expect } from '@playwright/test';
import { LoginData, readDataFromCSV } from '../utils/csvreader';
import { LoginPage } from '../pages/LoginPage';

//Doc file csv
const testData: LoginData[] = readDataFromCSV()
console.log(`Da load ${testData.length} dong du lieu tu file csv`);

test.describe('Login data using csv file', () => {
   for(let data of testData) {
    const testname=`${data.testID} ${data.description}`
    test(`${testname}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(data.username, data.password);
        const isSuccess = await loginPage.isLoginSuccessful();
       
       // const today= new Date().toISOString().split("T")[0];
        const screenshotPath= `test-results/picture/${data.description}.png`;
        console.log(screenshotPath)
       // await page.screenshot({path: screenshotPath, fullPage:true})
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