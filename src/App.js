import Navigation from "./component/navbar/navigation";
import Journals from "../src/pages/journal/journal";
import TradeDetail from "../src/component/trade-detail-form/TradeDetailForm";
import { Fragment } from "react";
import signIn from "./component/sign-in/sign-in";
import SignUp from "./component/sign-up/sign-up";

function App() {
  return (
    <Fragment>
      <Navigation />
      <div className="d-flex flex-column h-100">
        <div className="d-flex justify-content-between p-3">
          <Journals />
          <TradeDetail />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
