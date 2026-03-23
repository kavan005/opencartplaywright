import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';

//Load jsontest data
const jsonpath = "testdata/logindata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonpath);

for(const data of jsonTestData)
{
    test(`Login test with JSON data: ${data.testName} @Datadriven`, async ({page})=>{
        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homepage = new HomePage(page);
        await homepage.clickMyAccount();
        await homepage.clickLogin();

        const loginpage = new LoginPage(page);
        await loginpage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedin = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedin).toBeTruthy();
        }
        else
        {
            const errormessage = await loginpage.getloginErrorMessage();
            expect(errormessage).toBe('Warning: No match for E-Mail Address and/or Password.')

        }

    })
}


// Data from CSV file

//Load jsontest data
const csvpath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvpath);

for(const data of csvTestData)
{
    test(`Login test with CSV data: ${data.testName} @Datadriven`, async ({page})=>{
        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homepage = new HomePage(page);
        await homepage.clickMyAccount();
        await homepage.clickLogin();

        const loginpage = new LoginPage(page);
        await loginpage.login(data.email, data.password);

        if(data.expected.toLowerCase()==='success')
        {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedin = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedin).toBeTruthy();
        }
        else
        {
            const errormessage = await loginpage.getloginErrorMessage();
            expect(errormessage).toBe('Warning: No match for E-Mail Address and/or Password.')

        }

    })
}
