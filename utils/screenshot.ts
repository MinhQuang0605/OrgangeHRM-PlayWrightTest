//B1 hightlight element tren web
//B2 chup screenshot element đo

import { Locator, Page } from "@playwright/test";
import { lookup } from "node:dns";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from 'url'
//nhan vao cac tham so sau de tai su dung
//param 1: page -> object page hien thi web cua Playwright tren browser
//param 2: locator -> element can chup screenshot
//param 3; testName -> ten de dat folder luu screenshot
//param 4: stepName -> ten file screenshot

export async function hightlightAndScreenshot(
    page: Page,
    locator: Locator,
    testName: string,
    stepName: string
): Promise<void> {
    //  const __filename = fileURLToPath(import.meta.url)
    // const __dirname = path.dirname(__filename)
    //B1: Tao ten folder luu screenshot
    const folderName = testName.toLowerCase().replace(/ /g, "-");
    //B2: Tao duong dan luu folder
    //__dirname: thu muc hien tai cua file screenshot.ts
    // ..: tro ve thu muc cha utils
    const screenshotDir = join(__dirname, "..", "screenshot", folderName);
    

    //B3 Tao folder
    mkdirSync(screenshotDir, { recursive: true });

    //B4: Hightlight element tren web
    await locator.evaluate((element) => {
    //them vien do xung quanh element
    (element as HTMLElement).style.outline = "4px solid red";
    //Them background mau vang cho element
    (element as HTMLElement).style.backgroundColor = "yellow";
    })
    await page.waitForTimeout(1000); //cho locator hien thi voi style moi

    //B5: Chup screenshot element va luu vao folder
    const screenshotPath = join(screenshotDir, `${stepName}.png`);
    await page.screenshot({ path: screenshotPath });
    //await locator.screenshot({ path: screenshotPath }); chi chup element

    //Xoa hightlight
    await locator.evaluate((element) => {
        (element as HTMLElement).style.outline = "";
        (element as HTMLElement).style.backgroundColor = "";
    })
}