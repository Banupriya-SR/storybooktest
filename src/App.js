import React from 'react';
import {QueryClient,QueryClientProvider} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import { Input } from './stories/Input';
import SignIn from './features/sign-in/SignIn';
import { User } from './features/user/User';
import { UserQuery } from './features/user/UserQuery';

const queryClient=new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/input" element={<Input />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/userq" element={<UserQuery />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
