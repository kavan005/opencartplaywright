import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';


let homepage: HomePage;
let loginpage: LoginPage;
let config: TestConfig;
let accountpage: MyAccountPage;
test.beforeEach(async ({page})=>{
    config = new TestConfig();
        await page.goto(config.appUrl);
    homepage = new HomePage(page);
    loginpage = new LoginPage(page);
    accountpage = new MyAccountPage(page);

})

test.afterEach(async ({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
})

test('Login @master @sanity @regression', async()=>{

    await homepage.clickMyAccount();
    await homepage.clickLogin();

    await loginpage.login(config.email, config.password);

    const isLoggedin = await accountpage.isMyAccountPageExists()
    expect(isLoggedin).toBeTruthy();

    const title = await accountpage.getPageTitle()
    expect(title).toContain('My Account')
})