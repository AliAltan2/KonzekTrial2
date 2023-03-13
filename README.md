## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Explanation of this project

This is a project I made for the Konzek recuitment team to show my React capabilities. The E-mail is as follows:

Assignment
Create a single-page application with the following functionalities

Query a public GraphQL API and show the results in a list. This functionality is already provided, but feel free to change the query as you see fit.
The code currently uses the public Countries API. More info can be found here: https://studio.apollographql.com/public/countries/home?variant=current
Create a text filter above the list with which you can filter and group the results
E.g. if you input "search:tt group:size" it will search for the results containing "tt", and group those results by the value of a "size" field that they may have
The items in the list should be selectable and de-selectable by clicking on them
At most one item can be selected at a time
The background color of the selected item should be different than the background color of unselected items
The background color used for the selected item should be picked from a predefined set of colors (which you should define yourself). Make sure that when an item is selected, the color is different from the previous item that was selected
After the items are loaded and after filtering, automatically select the 10th item, or the last one if the amount of items is smaller than 10
The implementation should take into account that the list can get very long.

Additional notes
Use Typescript where possible
You're allowed to use open-source packages as you see fit.
Anything not in the description is up to you.

This project uses Countries API as it's API endpoint and uses appolo client, which was a first time for me.
The project can be divided into multiple bullet points as follows:

1. Query a public GraphQL API and show the results in a list. This functionality is already provided, but feel free to change the query as you see fit. (DONE)

2. Create a text filter above the list with which you can filter and group the results (NOT-IMPLEMENTED, FAILED)

3. The items in the list should be selectable and de-selectable by clicking on them (DONE)

4. At most one item can be selected at a time(DONE)

5. The background color of the selected item should be different than the background color of unselected items (DONE)

6. The background color used for the selected item should be picked from a predefined set of colors (which you should define yourself). (DONE)

7. Make sure that when an item is selected, the color is different from the previous item that was selected (DONE)

8. After the items are loaded and after filtering, automatically select the 10th item, or the last one if the amount of items is smaller than 10 (Semi-DONE)

The explanation of these bullet points are as follows:

1. The GraphQL API already has an explanation and code of how to pull and display the data. All I had to do was to change the mapping function to fit to the task at hand. However a big problem this api had was the fact that it used both useQuery and appolo client which created multiple problems along the way, and I couldn't solve some of them.

2. I failed to implement this to the project due to multiple reasons, but I managed to understand the way I was supposed to implement the system. I was eighter going to use built-in filter function or I was going to override the request as it came. However the first solution was not possible to implement due to the fact that my data was embdedded objects. The second option was possible to do and I found some good tutorials about how to do it (https://www.apollographql.com/blog/graphql/filtering/how-to-search-and-filter-results-with-graphql/) but I couldn't implement them, thus I failed to achieve this point.

3. This is done by using appropriate HTML tags for the list

4. This is done by using a hook that keeps a boolean data per country instance. When a click event happens, the onclick event removes the current active instance and activates the active boolean of the newly clicked one. Once a list item is clicked first the active item is deactivated then the activated item activates, thus only one item is active at a time.

5. This is done by giving colours to clicked li item and also having a default white coloured background that is universally active unless a li item has been clicked.

6. The colours of the li items are pre-defined in a constant called COLOURS, and the onclick event goes through this pre-defined list to decide the colour of the clicked li item

7. This is done by having a pre-defined colour loop, the colours loop around and eventually go back to the start of the loop. Since the wording used is "previous item" the colours don't need to be unique, thus completing the task fully.

8. This is done by giving the index value a default 10, and if it's lower than 10, making sure that the default index value is changed accordingly

The main struggle I had while doing this project was due to the fact that I don't have much experience using useQuerry, and it cannot be used in a function. I simply lacked the necessary knowledge to implement the search function properly, usually a .filter() function would be satisfactionary, but due to the emdedded status of the data,I also used some() function to go into the object, but I couldn't manage to implement the said solution in a proper way.

As requested I used typescript as much as possible.

For further questions, you can send a mail to altan.ali@outlook.com
