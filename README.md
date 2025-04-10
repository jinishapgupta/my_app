FoodieExpress App
A web application that allows users to search for restaurants based on their postcode, apply filters (e.g., "Open Now", "cuisines"), and sort results by rating or delivery time. The app  fetches restaurant data for the selected postcode.

Features

Search by Postcode: Enter a postcode to fetch restaurants in the area.
Filters:
    Open Now: Displays only restaurants currently open.
    Cuisines: Filter restaurants by specific cuisines.
Sorting:
Sort restaurants by Rating (highest to lowest).
Sort restaurants by Delivery Time (shortest to longest).
Interactive Map View: Toggle between a card view and a map view of restaurants.(A work in progress)

-------

Tech Stack

Frontend:
 React.js (with Next.js )
--I chose React because it is the most used framework these days and it has component based architecture which is easier to break down and interpret for a beginner like me. (I felt vue is a bit more advanced and complex to grasp)
Tailwind CSS for styling-easy to use rather than writing blocks of css.
Material-UI for components (e.g., Chips, Cards)
 
 Hacks-
 
  I encountered CORS error while trying to make request to the API from localhost:3000, resolved with a proxy server (localhost:5000) that is used to bypass CORS restrictions 
The flow is like -
The frontend sends a request to the proxy server (e.g., http://localhost:5000/api/restaurants).
The proxy server forwards the request to the external API (e.g., https://uk.api.just-eat.io).
The proxy server sends the response back to the frontend.


------

Folder Structure
my_app/
 src/
   app/
    components/
         Body.tsx/        # Main component for displaying restaurants
         Header.tsx/       # Header component with postcode input
         Footer.tsx/        # Footer with filters and sorting
         RestaurantCards/
            Card.tsx/     # Individual restaurant card component
            Cards.tsx/     # Component for rendering multiple cards
         MapView.tsx/     # Map view for restaurants
         MapCardPortal.tsx/ 
    page.tsx /             # Main page component
   styles/                   # Global styles
  public/                       
  package.json                  # Project dependencies and scripts


------
Key Components

Header
Displays the postcode input field.
Shows metadata such as the area name and the number of open restaurants in that area .
Body
Displays the list of restaurants as cards that updates based on filters (name,address,rating and cuisines)
Footer
Contains filter and sorting options (e.g., "cuisines","Open Now",'"delivery time", "Free Delivery" and other filters).
Card
Displays individual restaurant details (e.g., name, rating, delivery time).

------
Getting started

Prerequisites
Node.js (v18 or higher)
npm 


Clone the repository:
git clone https://github.com/jinishapgupta/my_app.git
Install dependencies:
npm install
Start the development server:
npm run dev
node proxyserver.js-  http://localhost:5000
Open the app in your browser:
http://localhost:3000

API Endpoints
https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}
---Fetches a list of restaurants based on the provided postcode.

Query Parameters:
postcode (string): The postcode to search for restaurants.

------

How It Works-

Postcode Search:
The user enters a postcode in the header.The app fetches restaurant data from the backend API. The area name with the number of restaurants available is displayed.
Filtering:
The Body component updates the displayed restaurants based on the selected filters.(name,delivery time,delivery fee,cuisines,address--in this case)
Sorting:
Sorting options (e.g., "Rating ?", "Delivery Time ?") are applied to the filtered restaurants.
Cuisines can also be filtered in the footer section.
(Open now and free delivery -- work in progress)

------

What can be improved??

Implement pagination for large datasets.
Add support for more advanced filters (e.g., price range, dietary options).
Integrate Google Maps for enhanced map view functionality.(work in progress)
Toggling to next page when clicked on cards to view elaborated restaurant details and incorporate further actions like ordering,payments etc.
Implement dynamic loading(lazy loading) to reduce loading time and improve performance while displaying the total restaurants in the area.
"Filters" in the footer section needs implementation.
Add user authentication for personalized filters and favorites.


-----
Contact

Name: Jinisha Puliyaranji
Email: jinishaagupta@gmailcom
GitHub: jinishapgupta

credits-
chat gpt :D