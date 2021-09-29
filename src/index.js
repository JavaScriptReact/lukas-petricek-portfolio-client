import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AdminForm from "./containers/AdminForm";
import "./styles/styl/style.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://www.lukas-petricek.com/graphql",
});

function Application() {
  const [show_admin_form, set_show_admin_form] = React.useState(false);

  React.useEffect(() => {
    window.onkeydown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === "a") {
        set_show_admin_form(true);
      }
    };
  }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        {show_admin_form ? <AdminForm action={set_show_admin_form} /> : <App />}
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
