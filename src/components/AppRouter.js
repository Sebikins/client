import React, {useContext} from 'react';

import {
    Routes,
    Route
} from "react-router-dom";
import {authRoutes,publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Library from "../Pages/Library";

const AppRouter = observer(() =>  {
    const {book, user} = useContext(Context)
    console.log(user)
    console.log(book)
    return(
           <Routes>
                {user._isAuth && authRoutes.map(({path, Component}) =>
                     <Route key = {path}  path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({path , Component}) =>
                   <Route key = {path} path = {path} element={<Component/>} exact/>
                )}
               <Route path = "*" element={<Library/>}/>
            </Routes>

    );
});

export default AppRouter;