import './app.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import FetchEvents from "@/event/fetch-events";
import CreateEvent from "@/event/create-event";
import useEventsHook from '@/hooks/use-events'
const root = document.getElementById("root");


// @ts-ignore
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/event" element={<FetchEvents />} />
      <Route path="/event/create" element={<CreateEvent />} />
    </Routes>
  </BrowserRouter>
);


export {useEventsHook}