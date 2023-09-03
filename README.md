### Live Link: https://book-catallog-server-inky.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signin (POST)
- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/02742cf8-e243-4d07-a3b3-704443b2dc51 (Single GET) Include an id that is saved in your database
- api/v1/users/02742cf8-e243-4d07-a3b3-704443b2dc51 (PATCH)
- api/v1/users/c0e62fe1-f3b3-493c-8f90-ccd417fb5a7b (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/db365b50-02e6-475e-b019-cb99e35215fe (Single GET) Include an id that is saved in your database
- api/v1/categories/db365b50-02e6-475e-b019-cb99e35215fe (PATCH)
- api/v1/categories/f1d309b0-60cd-444d-9116-755287043d88 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET) 
- api/v1/orders/:orderId (GET)