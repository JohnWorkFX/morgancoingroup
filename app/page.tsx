import Header from "./components/Header";
import Banner from "./components/Banner";
import MarketOverview from "./components/MarketOverview";
import ForexCrossRate from "./components/ForexCrossRate";
import Proposal from "./components/Proposal";
import SymbolInfo from "./components/SymbolInfo";
import Traders from "./components/Traders";
import Payments from "./components/Payments";
import Referal from "./components/referal";
import Footer from "./components/footer";
export default function Home() {
  return (
    <div className="">
     <Header/>
     <Banner/>
     <MarketOverview/>
     <ForexCrossRate/>
     <Proposal/>
     <SymbolInfo/>
     <Traders/>
     <Payments/>
     <Referal/>
     <Footer/>
    </div>
  );
}
