import { test, expect } from '@playwright/test';
import { LoginData, readDataFromCSV } from '../utils/csvreader';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login data from csv file', () => {
    let testData: LoginData[];
    //Doc file csv dung BeforeAll
    test.beforeEach(async () => {
        testData = await readDataFromCSV();

        //nen them log de kiem tra du lieu doc tu file csv
        console.log(`Da load ${testData.length} dong du lieu tu file csv`);
    })

    test("Test data", async ({ page }) => {
        //do testData la list nen dung for de duyet tung dong du lieu
        for (let data of testData) {
            const loginPage = new LoginPage(page);
            await loginPage.login(data.username, data.password);

            //kiem tra ket qua 
            if (data.expected_result === "success") {
                await loginPage.isLoginSuccessful() === true;
            }
            else {
                await loginPage.isLoginSuccessful() === false;
            }
        }
    });

})