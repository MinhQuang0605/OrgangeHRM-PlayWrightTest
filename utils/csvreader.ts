//De doc file va su ly file can import cac libraries sau
//import fs/promises de doc file
//path de tim duong dan tuyet doi
//csv-parse de phan tich file csv
import { readFile } from 'fs/promises';
import {join} from 'path';
import { parse } from 'csv-parse/sync';

//dinh nghia du lieu co trong file csv
export interface LoginData {
    username: string;
    password: string;
    expected_result: string;
    description: string;
}

export const readDataFromCSV = async (): Promise<LoginData[]> => {
    //B1: Xac dinh duong dan tuyet doi den file csv
    //../data/loginData.csv
    //__dirname: thu muc hien tai cua file dang dung
    const csvpath = join(__dirname, '..', 'data', 'loginData.csv');

    //B2: Doc file csv
    const fileContent = await readFile(csvpath, { encoding: 'utf-8' });

    //B3: Parse data string sang list login data
    const data = parse(fileContent, {
        columns: true, //cot dau tien la header, lam key
        skip_empty_lines: true, //bo qua dong trong
        trim: true //loai bo khoang trang thua

    })as LoginData[];

    return data;
}