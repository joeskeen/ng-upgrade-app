# NG Upgrade Assessment

## Overview

This repository contains a sample Angular/AngularJS hybrid application. Your objective is to
upgrade a portion of the application from AngularJS to Angular.

## Requirements

The `hcFormField` directive is an AngularJS directive that displays a different input control
depending on the target data type (for example, for a `varchar` data type it displays a text
box; for a `bit` data type it displays a checkbox). Using the existing setup of the hybrid
application, convert the `hcFormField` directive to an Angular component.

Please push your implementation to a Github repository and provide a link to the recruiter you
are working with. Your assessment will be reviewed and graded prior to an interview.

## Limit of Scope

Although there are a lot of data types defined in the project, focus primarily on supporting the
following data types:

- `varchar`
- `int`
- `bit`
- `Date`

It would be expected, however, that the solution would be designed such that other data types
could easily be implemented without requiring significant changes.

## Bonus Points

If you would like your submission to really shine, here are some things that could make your
implementation stand out:

- use of Cashmere: Cashmere is Health Catalyst's Angular UI library, and is open-source.
  Cashmere is already installed in the project. You can find more information about using
  Cashmere at the official website: <https://cashmere.healthcatalyst.net>
- validation: implement data validation for the input
