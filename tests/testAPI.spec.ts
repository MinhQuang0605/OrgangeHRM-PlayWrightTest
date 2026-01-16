// https://movienew.cybersoft.edu.vn/swagger/index.html

import { test,expect } from "@playwright/test";

test.describe("Api test -expect", ()=>{
    test("API GET list movie", async({page})=>{
         test.skip(!process.env.API_TOKEN, "No API token in CI");
        const response =await page.request.get(
            "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",{
                headers: {
                    TokenCybersoft:  process.env.API_TOKEN!
                }
            } 
        );
            //verify status code
            expect(response.status()).toBe(200)
            //verify response body JSON
            //convert data sang dang json
            //{
            //  key1: value1
            //  key2: value2
            //}
            const responseBody = await response.json();
            console.log(responseBody)
            expect(responseBody).toHaveProperty("statusCode");
            expect(responseBody).toHaveProperty("message");
            expect(responseBody).toHaveProperty("content");
            expect(responseBody).toHaveProperty("dateTime");
    })
})