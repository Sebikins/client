import {ADMIN_ROUTE, BOOK_ROUTE, LOGIN_ROUTE, REG_ROUTE, LIBRARY_ROUTE} from "./utils/consts";
import AdminPage from "./Pages/AdminPage";
import Library from "./Pages/Library";
import Auth from "./Pages/Auth";
import BookPage from "./Pages/BookPage";



export const authRoutes = [

  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: BOOK_ROUTE + '/:id',
        Component: BookPage
  },
  ]

export const publicRoutes = [
{
  path: LIBRARY_ROUTE,
      Component: Library
},
{
  path: LOGIN_ROUTE,
      Component: Auth
},
{
  path: REG_ROUTE,
      Component: Auth
},


]