## Marketplace React – FakeStore API

Simple React application that simulates a small marketplace to practice API consumption and navigation with React Router.

## Assignment goals

- **React with Router**: navigation between pages (list and details).
- **API consumption**: at least two related endpoints that work together.
- **Chosen API**: FakeStore `https://fakestoreapi.com/`.

## Endpoints used (FakeStore)

- **Product list**: `GET https://fakestoreapi.com/products`
- **Product details**: `GET https://fakestoreapi.com/products/:id`
- (Optional) **Products by category**: `GET https://fakestoreapi.com/products/category/:category`

These endpoints “talk to each other” since the list links to a specific product detail and optionally to category filtering.

## Application routes

- **/**: product list with title, image, price, and link to details
- **/product/:id**: details page for the selected product
- (Optional) **/category/:name**: list of products filtered by category

## How to run

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm start`
3. Open in the browser:
   - `http://localhost:3000`

## Available scripts

- `npm start`: start the development server
- `npm run build`: create a production build in `build/`
- `npm test`: run tests (when present)

## Stack and libraries

- **React** (Create React App)
- **React Router** (v6+)
- **Fetch/axios** for HTTP requests

## Structure (CRA defaults)

- `src/`: React components, styles, and app bootstrap
- `public/`: base HTML and static assets

## Next steps (ideas)

- Pagination and search
- Simple cart (local state)
- Loading/error states and skeletons

## References

- FakeStore API: `https://fakestoreapi.com/`
- React Router docs: `https://reactrouter.com/`
