import React, { useState } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
} from 'react-router-dom';

import Todo from './components/Todo';
import Details from './components/Details';
const App = () => {

    return (
        <div className='mt-5' >

            <Routes>

                <Route path="/" element={<Todo />} />
                <Route path="/details" element={< Details />} />

            </Routes>

        </div>
    )
}

export default App
