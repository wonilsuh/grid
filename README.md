# IBM Grid

![Introducing the IBM Grid](/docs/intro.gif?raw=true)

The Sketch file and a flexbox code implementation of the IBM Grid.

---

**Warning:** IBM Grid is still in development and being carefully implemented in real cases where we can look for any difficulties. Look out for a stable v1.0.0 release by October 16th.

---

### IBM Grid Checker

Check that any webpage follows the IBM Grid with our [Chrome and Firefox extension](https://github.com/ibm/grid-checker). This extremely helpful to developers as they code and designers as they review work.

[Get IBM Grid Checker for Chrome](https://chrome.google.com/webstore/detail/ibm-grid-checker/pldabmdegaljijpjldajlemcdfghmdib)

[Get IBM Grid Checker for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ibm-grid-checker)

### Examples

We want to show off many examples of what IBM Grid is capable of. Check out the examples below and learn at the bottom of this document how to provide a new example:
-  [Capabilities](https://ibm.github.io/grid/capabilities.html) ([Source](./docs/capabilities.html))
-  [Dev Tutorial](https://ibm.github.io/grid/) ([Source](./docs/index.html))

# Design

### IBM Grid Sketch File

Use these artboards in your Sketch files to accomplish a design at each breakpoint your developer will be working with. Right click and select `Save link as` to save this [Sketch file](https://github.com/IBM/grid/raw/master/ibm-grid.sketch).

### Do I have to use this grid design?
For an experience to represent IBM, it should match the specs of the [Sketch file](https://github.com/IBM/grid/raw/master/ibm-grid.sketch) and [IBM Grid Checker](https://ibm.com/ibm/grid-checker).

### Why does IBM have a grid for all digital experiences?

This is a part of an effort to make sure a user feels like they are working with the same company across any variety of experiences.

# Code

The IBM Grid code provides the following benefits:

- Specify an col's width and existence at different breakpoints
- Group cols together to form any combination of nested rows and columns
- Remove the default padding when not needed for media and then reapply it on any child desired
- Stretch the background (aka bleed) of an col on our large breakpoint when

### How to Use

To install, run `npm install @ibm/grid`

If you want to use the compiled css, reference the file in the dist folder:
```
<link rel="stylesheet" type="text/css" href="node_modules/@ibm/grid/dist/ibm-grid.min.css">
```

If you want to use the sass partials, import the files in the src folder:
```
@import 'node_modules/@ibm/grid/src/_core.scss';
@import 'node_modules/@ibm/grid/src/_bleed.scss';
@import 'node_modules/@ibm/grid/src/_height.scss';
```

Check out the Performance section below for a description of each partial.

### Developer Tutorial

Use [this walkthrough](https://ibm.github.io/grid/) to learn the foundational aspects of coding with the IBM Grid. Recommended for all first-time users.

### Do I have to use this grid code?

You do not need to use the code in this repo. We understand that there are many ways to accomplish the same goal in code. The flexbox code provided here is to help anyone who wants it.

### Where is the CSS Grid Spec implementation?

We want to use the [CSS Grid Spec](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). However, many of our experiences support IE11 at the moment. If your experience does not need to support IE11 or you do not need the [missing specs in IE11](https://rachelandrew.co.uk/archives/2016/11/26/should-i-try-to-use-the-ie-implementation-of-css-grid-layout/), feel free to use CSS Grid.

If you would like to help develop a resource to implement this grid using CSS Grid, contributions are welcome!

## Class Reference

The classes are listed below, separated by which SCSS partial they are included in. It is necessary to use `_core.scss` to use any of the other partials.

### Core

There are three breakpoints in IBM Grid: sm (0px+), md (640px+), and lg (1056px+). At each larger breakpoint, the screen is divided into additional columns: 4, 8, and then 16 respectively.

**Note:** To respect mobile-first design, a smaller breakpoints’ columns will scale at the next breakpoint unless the next breakpoint has column widths specified. This means that setting a column at `.ibm-col-sm-2` will maintain half of the grid’s width throughout unless a width is specified at a larger breakpoint.

| Class | Purpose |
|---|---|
| `.ibm` | Container div of the grid |
| **Columns** | |
| `.ibm-col-sm-[0-4]` | Set the width out of four columns for an item in the grid starting at 0px screen width |
| `.ibm-col-md-[0-8]` | Set the width out of eight columns for an item in the grid starting at 640px screen width |
| `.ibm-col-lg-[0-16]` | Set the width out of sixteen columns for an item in the grid starting at 1056px screen width |
| **Column Modifiers** | |
| `.ibm-col-group` | Use a column to group other columns to make sub-rows and sub-columns <br> <br> *This is the most powerful part of IBM Grid’s ability to make complex layouts.* |
| `.ibm-col-[sm, md, lg]-0-only` | Do not display a column at a specific breakpoint |
| `.ibm-col-full` | Remove all padding of a column |

### Bleed

| Class | Purpose |
| **Column Modifiers** | |
| `.ibm-col-bleed` | Stretch a column’s background color or image across the lg breakpoint’s horizontal margin on both sides <br> <br> *Can be mixed with `.ibm-col-full`.* |
| `.ibm-col-bleed-[left, right]` | Stretch a column’s background color or image across the lg breakpoint’s horizontal margin on a single side <br> <br> *Can be mixed with `.ibm-col-full`.* |

### Height

The grid contains the same unit sizes that a visual designer uses. These units change size between breakpoints: sm = 1/16vw, md = 1/32vw, and lg = 1/66vw. We use these units to measure specific heights in all of our wireframes and mock-ups.

**Note:** To respect mobile-first design, a smaller breakpoints’ units will scale at the next breakpoint unless the next breakpoint has unit heights specified. This means that setting a height at `.ibm-height-sm-2` will scale to `.ibm-height-md-4` and `.ibm-height-lg-8` unless a height at those breakpoints is specified. You can use a height at `0` to unset heights at a breakpoint.

**Note:** Since this code uses flex wrap, a row of columns will reflect the column with the largest height. To undo this behavior, you can wrap the smaller height in a `.ibm-col-group` to ignore the larger height sibling.

| Class | Purpose |
|---|---|
| **Heights** | |
| `.ibm-height-sm-[0-16]` | Set the min-height based on the units of the grid starting at 0px screen width |
| `.ibm-height-md-[0-16]` | Set the min-height based on the units of the grid starting at 640px screen width |
| `.ibm-height-lg-[0-33]` | Set the min-height based on the units of the grid starting at 1056px screen width |
| **Height Modifiers** | |
| `.ibm-height-strict` | Will switch the behavior of the height from min-height to height |
| **Additional Padding** | |
| `.ibm-padding` | Set the padding of an element at one unit of the grid <br> <br> *Each column already applies one unit of padding. You can add this element inside for another unit of padding. Most helpful when using `.ibm-col-full` and you want to add padding back in a child.* |
| `.ibm-padding-[horizontal, vertical]` | Set either the horizontal or vertical padding of an element at one unit of the grid |

## Performance

There are three distinct capabilities of this codebase and you are welcome to only import what you need:
1. Core - All capabilities not listed below.
2. Bleed - Allows you to stretch background colors and media across the left and right edges of the grid on the large breakpoint.
3. Height - Allows you to set heights of any elements to the grid

| | Includes core grid? | Includes lg bleeds? | Includes heights? | File Size | Minified | Gzip |
|---|---|---|---|---|---|---|
| IBM Grid | Yes | Yes | Yes | 19kb | 14kb | 2.2kb |
| _core.scss | Yes | No | No | 8kb | 6kb | 1.0kb |
| _bleed.scss | No | Yes | No | 2kb | 1kb | 0.2kb |
| _height.scss | No | No | Yes | 9kb | 7kb | 1.0kb |

## Contribute

To learn how to edit the grid or add an example, check out our [contributing documentation](./docs/contributing.md).
