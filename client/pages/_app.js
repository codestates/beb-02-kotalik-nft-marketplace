import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import Web3 from "web3";

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState();
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
  }, []);
  const connectWallet = async () => {
    accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  };
  return (
    <>
      <Header connectWallet={connectWallet} web3={web3} account={account} />
      <Component web3={web3} account={account} />
      <div className="App">
        <div className="userInfo">주소: {account}</div>
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
