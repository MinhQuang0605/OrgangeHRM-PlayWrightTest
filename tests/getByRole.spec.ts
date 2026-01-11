import {test, expect} from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { hightlightAndScreenshot } from '../utils/screenshot';

test.describe("Test get by role with HTML local",()=>{
    //set up load file HTML truoc test case thong qua 
    test.beforeEach(async({page})=>{{
            //B1 doc file HTML o folder public
            
            const htmlPath = join(__dirname, "..", "public", "index.html");
            console.log("Path file HTML: "+ htmlPath);

            //B2 set file HTML vao page playwright
            const htmlContent = readFileSync(htmlPath, 'utf-8');
            await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    }});

    //test case1: button
    test("Get button by role", async({page})=>{
                // <button type="submit" class="btn-primary" aria-label="Submit form button">
                //     Submit
                // </button>
                const submitBtn = page.getByRole('button', {name: 'Submit'})
                await expect(submitBtn).toBeVisible();
                await page.waitForTimeout(3000);
    });
    test("Test input by role", async({page})=>{
            // <input 
            //             type="text" 
            //             id="username" 
            //             name="username" 
            //             placeholder="Nhập username"
            //             aria-label="Username input field"
            //         >
            const usernameInput = page.getByRole('textbox', {name: 'Username input field'});
            await expect(usernameInput).toBeVisible();
            await page.waitForTimeout(3000);    
    })
    test("Dropdown select, get by role", async({page})=>{
        // <select id="country" name="country" aria-label="Country selection">
        //                 <option value="">-- Select --</option>
        //                 <option value="vn">Vietnam</option>
        //                 <option value="us">United States</option>
        //                 <option value="uk">United Kingdom</option>
        //             </select>
        const countrySelect = page.getByRole('combobox', {name: 'Country'});
        //Di chuyen den element select
        await countrySelect.scrollIntoViewIfNeeded();
        await hightlightAndScreenshot(page, countrySelect, "Get By Role Test", "country_select");
        await expect(countrySelect).toBeVisible();

        await countrySelect.selectOption({label: 'United States'});
        await expect(countrySelect).toHaveValue('us');

        await page.waitForTimeout(3000);
    })

      test("Test checkbox", async({page}) => {
        // <label>
        //     <input 
        //         type="checkbox" 
        //         id="agree" 
        //         name="agree"
        //         aria-label="Agree to terms checkbox"
        //     >
        //     Tôi đồng ý với điều khoản
        // </label>
        const agreeCheckbox = page.getByRole("checkbox", {name: "agree"})
        await expect(agreeCheckbox).toBeVisible()

        await agreeCheckbox.check()
        await expect(agreeCheckbox).toBeChecked()

        await page.waitForTimeout(2000)
    })

     test("Check radio button test", async({page})=>{
        // <label>
        //                 <input 
        //                     type="radio" 
        //                     id="male" 
        //                     name="gender" 
        //                     value="male"
        //                     aria-label="Male gender option"
        //                 >
        //                 Nam
        //             </label>
        const maleRadioButton = page.getByRole("radio", {name: "male"}).first();

        await expect(maleRadioButton).toBeVisible()

        maleRadioButton.check();

        await expect(maleRadioButton).toBeChecked()

        })

             test("Check table test", async({page})=>{
        //         <table role="table">
        //         <thead>
        //             <tr>
        //                 <th scope="col">ID</th>
        //                 <th scope="col">Name</th>
        //                 <th scope="col">Email</th>
        //                 <th scope="col">Role</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>1</td>
        //                 <td>John Doe</td>
        //                 <td>john@example.com</td>
        //                 <td>Admin</td>
        //             </tr>
        //             <tr>
        //                 <td>2</td>
        //                 <td>Jane Smith</td>
        //                 <td>jane@example.com</td>
        //                 <td>User</td>
        //             </tr>
        //             <tr>
        //                 <td>3</td>
        //                 <td>Bob Johnson</td>
        //                 <td>bob@example.com</td>
        //                 <td>Manager</td>
        //             </tr>
        //         </tbody>
        //     </table>

        const table = page.getByRole("table");
        await expect(table).toBeVisible();

        //kiem tra data trong table
        const JoinRow= table.getByRole("cell", {name: "John Doe"});
        await expect(JoinRow).toBeVisible();

        //kiem tra trong table co bao nhieu data
        const rows = table.getByRole("row");
        let countRow =await rows.count();
        console.log(`Co ${countRow} hang du lieu`)
        await expect(countRow).toBe(4); //Bao gom 1 header + 3 data
        })

        test(" Test link", async({page})=>{
                const navigation = page.getByRole("navigation");
                await expect(navigation).toBeVisible();

                const HomeLink = navigation.getByRole("link").filter({hasText:"Home"}).first();
                await expect(HomeLink).toBeVisible()
        })
})