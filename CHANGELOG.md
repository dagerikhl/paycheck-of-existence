# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
