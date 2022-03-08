import { useSelector } from "react-redux"
import Navigation from "./component/navbar/navigation";
import Journals from "../src/pages/journal/journal";
import Trades from "./pages/trades/trades";
import TradeDetail from "../src/component/trade-detail-form/TradeDetailForm";
import NewsPanel from "./component/news-panel/news_panel";
import { Fragment } from "react";
import ChartImgModal from "./component/modals/chartImg/chart-img-modal";
import "./app.scss"


function App() {
  const enterJournal = useSelector(state => state.journal.enterJournal)
  //const showChart = useSelector((state) => state.modal.chartModalState);
  //console.log("app rendering");
  return (
    <Fragment>
      {/*showChart && <ChartImgModal />*/}
      <Navigation />
      <div className="app">
        <div className="journal-content  h-100">
          {enterJournal ? <Trades /> : <Journals />}
          <TradeDetail />
        </div>
        {/*<div className="news-content ">
          <NewsPanel />
        </div>*/}
      </div>
    </Fragment>
  );
}

export default App;
