# The Coda Collection E2E Tests

#### Dependencies

```
cypress
cypress-mochawesome-reporter
```

#### Cypress

Cypress is a javascript e2e automation testing tool chosen for the project.


#### cypress-mochawesome-reporter
Mochawesome reporter is an html reporter for Cypress which includes results with details and screenshots attached.

#### Open Cypress Test Runner

This command opens the cypress test runner where you can run the actual test suite on different browsers.

```
npx cypress open
```

#### Run Tests In Headless Mode

You can run tests headlessly by using this command and specifying the desired browser. If browser is not specified, the tests will be run on electron by default.

When running tests headlessly the reporting will be created automatically and can be found under cypress/reports. You can open the index.html file under reports and check the results.

Also by current configuration, a screenshot folder will be created when running tests in this mode and in case of any test failure, the screenshot will be attached to the failed step in the reporting.

```
npx cypress run -b <browsername>
e.g. npx cypress run -b chrome
```

#### CI Pipeline Integration

Github actions are used to run the tests in CI. A run is triggered when someone makes a pull request and the configuration workflow can be found under .github\workflows in the e2e-ci.yml file.

Under Actions in GitHub, you can see all workflows and runs and also observe any result while running.

After the tests are run on Github Actions, an artifact with the generated report results will be created and you can download it and check the results.

If any test fails, the action workflow will be marked as failed.


#### Repository:

```
https://github.com/MirlindPovio/codacollection-e2e
```

#### CI:

```
https://github.com/MirlindPovio/codacollection-e2e/actions
```

#### Sample with the passed tests:

```
https://github.com/MirlindPovio/codacollection-e2e/actions/runs/1838441884
```

#### Sample with the failed tests:

```
https://github.com/MirlindPovio/codacollection-e2e/actions/runs/1838303778
```