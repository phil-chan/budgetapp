# budget app

running it locally:
1. npm run dev
2. http://localhost:3000/
3. register as a user (via the nav bar)

### What is it?
It lets you record your spending and gives you a summary based on category of spending

### Features
#### MVP
* I want to register under a name
* I want to add an expense
* I want to edit an expense
* I want to delete an expense
* I want to view a history of my expenses
* I want to filter my expenses by category

#### Addtional
* I want to see a graph in my history for expenses
* I want to filter on that graph for my expenses by category
* I want to sort by costs
* I want to sort alphabetically
* I want to sort by entry date

## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | BudgetApp | View for user to see all their expenses and an add expense button (home-page) |
  | Add | View for the user to add a new expense (modal) |
  | Edit | View for the user to edit the expense (modal)


## Reducers (Client Side)
  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | expenses | Store current scraps |
  | addExpense | Store information about the scrap item |
  | filterCategory | Toggles the filters to see items by filtering category |

 ## Actions

 ### expenses

 | type | data | purpose |
 | --- | --- | --- |
 | RECEIVE_EXPENSE | expenses | Retreive expense from the db and store in redux |
 | EDIT_EXPENSE | expenses | Edit expense from the db and store in redux |
 | DELETE_EXPENSE | expenses | Delete a single expense |
 

 ### addForm
 | type | data | purpose |
 | --- | --- | --- |
 | ADD_EXPENSE | expenses | Add a single expense item to the history list (home page) after it is created |

 ### filterExpenses
  | type | data | purpose |
| --- | --- | --- |
| FILTER | null | toggle between expenses to update the history list (home page) display based on filtered categories  |

## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /login | Yes | Log In a User | The Users JWT Token |
| Post | /register | Yes | Register a User | The Users JWT Token |
| Get | /expenses | Yes | Get all expenses | An Array of expenses |
| Post | /expense/add | Yes | Add a new expense | The expense that has been saved in db read format |
| Get | /user/:id | Yes | Get the user profile | A users jwt token |

## DB (Server Side)


### Users
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | username | String |
  | name | String |
  | hash | text |
  | created_at | timestamps |
  | updated_at | timestamps |

### Expenses 
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | expense_name | String |
  | expense_description | String |
  | category | String |
  | cost | Integer |
  | date | date |
  | user_id | Integer |

## The Tech

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js (SQL)](https://knexjs.org/)
* [Bulma (CSS framework)](https://bulma.io/documentation/)
* [JWT Auth (Local)](https://jwt.io/)

The Migration and seeds for the users table, and all login functionality is already set up!
The mobile responsiveness is also being handled by some neat JS and Bulma classes, be sure to incorporate that view in your project goals!


## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app


### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:
```sh
npm run h:deploy
```

Run heroku migrations:
```sh
npm run h:migrate
```

Run heroku seeds:
```sh
npm run h:seed
```

If ever you need to rollback, you can also:
```sh
npm run h:rollback
