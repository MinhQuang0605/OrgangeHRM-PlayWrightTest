# Playwright Test Automation

## 1. Introduction

This project demonstrates basic testing using Playwright.
The purpose of this project is to practice automated testing for web applications.

The [test cases](https://docs.google.com/spreadsheets/d/1wmeItPXGKtf6fGQxil-XVXtkQe0kOaT-22OtXpulwSo/edit?gid=0#gid=0) cover  scenarios such as:
* Login functionality
* Navigation between pages
* Basic UI validation
* Validate data on pages
* Modifing data on page
* Login with CSV


## 2. Tech Stack

* Playwright
* Typescript

## 3. Project Structure

```
project-root
│
├── tests/               # Test cases
│   ├── admin.spec.ts
│   ├── claim.spec.ts
│   ├── home.spec.ts
│   ├── myinfo.spec.ts
│   ├── login-data.spec.ts
│   ├── login.spec.ts
│   ├── mobileTest
│       ├─── mobileAdmin.spec.ts
│       ├─── mobileHome.spec.ts
│       ├─── mobileLoginTest.spec.ts
│
├── pages/               # Page Object Models
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── MyInfoPage.spec.ts
│   ├── Claim.spec.ts
│   ├── Admin.spec.ts
├── utils/
│   ├── csvreader.ts
│   ├── screenshot.ts
│   ├── faker.ts
├── playwright.config.ts # Playwright configuration
├── package.json
└── README.md
```

## Practice Files

The getByRole.spec.ts and testAPI.spec.ts files contains some experimental scripts used for learning purposes, such as:

* Basic API testing with Playwright
* Practicing element locators

These files are not part of the main test suite.


## 4. Prerequisites

Make sure the following tools are installed:

* Node.js (>= 18)
* npm or yarn

Check installation:

```
node -v
npm -v
```

## 5. Installation

Clone the repository:

```
git clone https://github.com/MinhQuang0605/OrgangeHRM-PlayWrightTest.git
```

Install dependencies:

```
npm install
```

Install Playwright browsers:

```
npx playwright install
```

## 6. Run Tests

Run all tests:

```
npx playwright test
```

Run tests in UI mode:

```
npx playwright test --ui
```

Run a specific test file:

```
npn run test:login
```

## 7. Test Report

After running tests, open the HTML report:

```
npx playwright show-report
```

## 8. Author

Name: Dương Lê Minh Quang

Role: QA Automation Engineer (Fresher)
