import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Caver from "caver-js";

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState();
  const [caver, setCaver] = useState();
  const [account, setAccount] = useState("");

  let accounts;
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }

    if (typeof klaytn !== "undefined") {
      try {
        const caver = new Caver(klaytn);
        setCaver(caver);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  const connectWallet = async () => {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    setAccount(accounts[0]);
  };

  const connectKaikas = async () => {
    accounts = await klaytn.enable();
    const address = accounts[0];
    setAccount(accounts[0]);
  }

  return (
    <>
      <Header connectWallet={connectWallet} connectKaikas={connectKaikas} web3={web3} caver={caver} account={account} />
      <Component web3={web3} caver={caver} account={account} />
      <div className="App">
        <div className="userInfo">주소: {account}</div>
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
