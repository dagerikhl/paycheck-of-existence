# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.6.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.5.0...v2.6.0) (2019-11-05)


### Features

* **periodpicker:** move PeriodPicker into WeekTable + prompt on dirty ([424304c](https://github.com/dagerikhl/paycheck-of-existence/commit/424304c))
* **weektable:** add prompt to prevent leaving page with unsaved changes ([4ce80b8](https://github.com/dagerikhl/paycheck-of-existence/commit/4ce80b8))



## [2.5.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.4.0...v2.5.0) (2019-10-31)


### Bug Fixes

* **totals:** visualize negative SS ([2eb2b6f](https://github.com/dagerikhl/paycheck-of-existence/commit/2eb2b6f))
* **workday-helper:** ignore hidden projects in totals ([34e1709](https://github.com/dagerikhl/paycheck-of-existence/commit/34e1709))


### Features

* **DataControls:** move data controls to sticky top header ([18a51b0](https://github.com/dagerikhl/paycheck-of-existence/commit/18a51b0))
* **WeekTable:** make WeekTable header sticky ([85377f4](https://github.com/dagerikhl/paycheck-of-existence/commit/85377f4))



## [2.4.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.3.1...v2.4.0) (2019-08-19)


### Features

* **summarypage:** add summary page ([e1d4b37](https://github.com/dagerikhl/paycheck-of-existence/commit/e1d4b37))



### [2.3.1](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.3.0...v2.3.1) (2019-07-14)


### Bug Fixes

* **npm:** fix order of prodset script ([ad6e00e](https://github.com/dagerikhl/paycheck-of-existence/commit/ad6e00e))



## [2.3.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.2.0...v2.3.0) (2019-07-14)


### Build System

* **npm:** remove hats from all dependencies ([988b142](https://github.com/dagerikhl/paycheck-of-existence/commit/988b142))
* **npm:** update all npm packages to newest version ([f5fce47](https://github.com/dagerikhl/paycheck-of-existence/commit/f5fce47))


### Features

* **projects:** remove workdayLength, add show bool to projects ([be9929d](https://github.com/dagerikhl/paycheck-of-existence/commit/be9929d))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.1.0...v2.2.0) (2019-07-13)


### Features

* **data:** use redux-thunk for async side effects with redux store ([7579aba](https://github.com/dagerikhl/paycheck-of-existence/commit/7579aba))
* **projects:** add projects API ([ce5f219](https://github.com/dagerikhl/paycheck-of-existence/commit/ce5f219))
* **projects:** add projects state and communicate with the projects API ([7b8fca0](https://github.com/dagerikhl/paycheck-of-existence/commit/7b8fca0))
* **totals:** add total of hours + -ss to totals row ([e08ba82](https://github.com/dagerikhl/paycheck-of-existence/commit/e08ba82))
* **totals:** add totals to each day ([fa1f074](https://github.com/dagerikhl/paycheck-of-existence/commit/fa1f074))
* **totals:** add totals to week table for hours+ss ([709c1c2](https://github.com/dagerikhl/paycheck-of-existence/commit/709c1c2))
* **weektable:** add labels to week table columns ([4465efb](https://github.com/dagerikhl/paycheck-of-existence/commit/4465efb))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v2.0.0...v2.1.0) (2019-06-07)


### Bug Fixes

* **external-link:** Fix href pointing to undefined and fix subjet of mailto-link ([42a3162](https://github.com/dagerikhl/paycheck-of-existence/commit/42a3162))


### Features

* **data:** rework app to work with new data structure ([94284d3](https://github.com/dagerikhl/paycheck-of-existence/commit/94284d3))
* **datacontrols:** add box shadow to data controls in weektable ([141f309](https://github.com/dagerikhl/paycheck-of-existence/commit/141f309))
* **footer:** Improve visual display of site footer sections ([0e006d5](https://github.com/dagerikhl/paycheck-of-existence/commit/0e006d5))
* **period:** Restrict visibility of period to authorized users ([1df9f4e](https://github.com/dagerikhl/paycheck-of-existence/commit/1df9f4e))
* **period:** rewrite period from year/weekNumber to from/to ([001e079](https://github.com/dagerikhl/paycheck-of-existence/commit/001e079))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v1.1.0...v2.0.0) (2018-12-15)


### Bug Fixes

* **typo:** Fix typo in data collection disclaimer in footer ([7372844](https://github.com/dagerikhl/paycheck-of-existence/commit/7372844))


### Features

* **hours:** Add total summary to footer of WeekTable with hours, ss, ot, total ([ed0f82d](https://github.com/dagerikhl/paycheck-of-existence/commit/ed0f82d))
* **hours:** Allow negative values for ss input fields ([dfcb58e](https://github.com/dagerikhl/paycheck-of-existence/commit/dfcb58e))
* **HoursPage:** Alter HoursPage to only show 1 week, and hoist week controls up to SiteHeader ([f7d06c2](https://github.com/dagerikhl/paycheck-of-existence/commit/f7d06c2))
* **input:** Add title to inputs if to be able to read them if they aren't big enough ([3e53518](https://github.com/dagerikhl/paycheck-of-existence/commit/3e53518))


### BREAKING CHANGES

* **HoursPage:** It is no longer possible to view multiple weeks at the same time.



<a name="1.1.0"></a>
# [1.1.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v1.0.0...v1.1.0) (2018-11-25)


### Features

* **footer:** Add contact and disclaimers (super serial) in footer ([6f29106](https://github.com/dagerikhl/paycheck-of-existence/commit/6f29106))
* **footer:** Add current version of app in footer ([7809457](https://github.com/dagerikhl/paycheck-of-existence/commit/7809457))
* **hours:** Only show 1 (not 2) week by default on Hours page ([12c92fc](https://github.com/dagerikhl/paycheck-of-existence/commit/12c92fc))
* **hours:** Save unsaved changes when Enter is pressed ([4d833bc](https://github.com/dagerikhl/paycheck-of-existence/commit/4d833bc))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v0.3.0...v1.0.0) (2018-11-24)


### Bug Fixes

* **header:** Remove cursor: pointer from active link ([2e0a4a6](https://github.com/dagerikhl/paycheck-of-existence/commit/2e0a4a6))


### ci

* **database:** Update database rules to require the user to be logged in ([df6bd91](https://github.com/dagerikhl/paycheck-of-existence/commit/df6bd91))
* **staging:** Add staging project and set it up in firebase ([c418ad4](https://github.com/dagerikhl/paycheck-of-existence/commit/c418ad4))


### Features

* **hours:** Change WeekTable headers to be more descriptive ([b2f5a1a](https://github.com/dagerikhl/paycheck-of-existence/commit/b2f5a1a))
* **hours:** Prompt the user to leave or stay when they have unsaved changes in Hours ([815193e](https://github.com/dagerikhl/paycheck-of-existence/commit/815193e))


### BREAKING CHANGES

* **database:** Every user attempting to read or write to the database _must_ be logged in.
* **staging:** The development environment now points to staging instead of production.



<a name="0.3.0"></a>
# [0.3.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v0.2.0...v0.3.0) (2018-11-22)


### Features

* **header:** Improve how active route links are styled in site header ([db650ab](https://github.com/dagerikhl/paycheck-of-existence/commit/db650ab))
* **hours:** Properly indicate that cells in WeekTable are dirty, and show save/discard based on it ([f144db7](https://github.com/dagerikhl/paycheck-of-existence/commit/f144db7))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/dagerikhl/paycheck-of-existence/compare/v0.1.0...v0.2.0) (2018-11-20)


### Bug Fixes

* **year:** Fix withData not using nextProps to determine what year to fetch from server ([5ee2956](https://github.com/dagerikhl/paycheck-of-existence/commit/5ee2956))


### Features

* **loader:** Add explaining text to all loader components ([b652b03](https://github.com/dagerikhl/paycheck-of-existence/commit/b652b03))



<a name="0.1.0"></a>
# 0.1.0 (2018-11-20)


### build

* **devops:** Add commitizen and standard-version for new way of releasing builds ([ab6ddfa](https://github.com/dagerikhl/paycheck-of-existence/commit/ab6ddfa))


### BREAKING CHANGES

* **devops:** All commit messages shall henceforth follow the conventional-changelog format.
