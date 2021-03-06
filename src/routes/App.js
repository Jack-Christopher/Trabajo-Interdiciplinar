import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../container/Home";
import Layout from "../container/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import ContentFile from "../container/ContentFile";
import NotFound from "../container/NotFound";
import Login from "../container/Login";
import HomeTeacher from "../container/HomeTeacher";
import FormTeacher from "../components/FormTeacher";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={FormTeacher} />
        <Route exact path="/teacher" component={HomeTeacher} />
        <Route exact path="/content" component={ContentFile} />
        <Route exact path="/HomeTeacher" component={HomeTeacher} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
