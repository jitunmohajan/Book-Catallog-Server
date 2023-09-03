import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { bookRoutes } from '../modules/book/book.routes';
import { profileRoutes } from '../modules/profile/profile.routes';
import { orderRoutes } from '../modules/order/order.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    route: authRoutes
  },
  {
    path: "/users",
    route: userRoutes
  },
  {
    path: "/categories",
    route: categoryRoutes
  },
  {
    path: "/books",
    route: bookRoutes
  },
  {
    path: "/profile",
    route: profileRoutes
  },
  {
    path: "/orders",
    route: orderRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
