# User Guide

## Personal Budget Tracker

Personal Budget Tracker is a web application for managing a personal monthly budget. It allows users to track income and expenses, view monthly summaries, analyze spending through charts, and import or export data.

The application runs directly in the browser and does not require user authentication. Data is stored locally in the browser using LocalStorage, so it remains available after refreshing the page. However, the data is stored only in the current browser on the current device.

## Live Application

The application is publicly available through GitHub Pages:

https://ondrej-diepolt.github.io/personal-budget-tracker/

## Main Features

The application provides the following features:

- adding and editing income and expense transactions,
- monthly budget overview,
- income, expense, and balance summary,
- category-based expense tracking,
- charts for visual budget analysis,
- data import from JSON and CSV files,
- data export to JSON and CSV files,
- local data persistence using LocalStorage.

## Basic Usage

After opening the application, the user can start managing their budget immediately. No registration or login is required.

The main page contains a budget overview, a list of transactions, charts, and import/export controls.

## Adding and Editing Transactions

Users can add transactions directly in the transaction list. Each transaction contains:

- name,
- amount,
- category,
- transaction type.

Examples of transactions include:

- salary,
- rent,
- groceries,
- transport,
- entertainment,
- other expenses.

When a transaction is added or updated, the application automatically recalculates the budget summary and updates the charts.

## Monthly Budget Overview

The application displays a summary for the selected month. The user can see:

- total income,
- total expenses,
- final balance,
- distribution of expenses by category.

This makes it easy to check whether the monthly budget is positive or negative.

## Working with Months

The application supports month-based budgeting. Users can switch between months and manage transactions separately for each month.

Each month has its own stored data. When the user returns to a previously selected month, the transactions for that month are loaded again.

## Charts

The application includes charts that provide a visual overview of the budget. They help users understand the structure of their income and expenses more easily.

Charts are rendered using the Recharts library, which uses SVG for graphical output.

## Importing Data

The application supports importing data from files. Users can import a file either by selecting it manually or by dragging and dropping it into the designated drop zone.

Supported import formats:

- JSON,
- CSV.

This feature can be used to restore previously exported data or to quickly load prepared test data.

## Exporting Data

Users can export their current data to a file. Exporting is useful for backups or for transferring data to another browser.

Supported export formats:

- JSON,
- CSV.

Exported files can later be imported back into the application.

## Data Storage

The application stores data using LocalStorage.

Important notes:

- data remains available after refreshing the page,
- data is not sent to any server,
- data is not shared between users,
- data is not shared between devices,
- a different user opening the application will see an empty budget,
- clearing browser data may remove saved application data.

## Technical Notes

The application is built with React and Vite. Recharts is used for charts. Data persistence is implemented using LocalStorage. File import uses the File API and drag-and-drop events. Data export uses the Blob API.