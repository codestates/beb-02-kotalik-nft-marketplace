import { useState, useEffect } from "react";
import Web3 from "web3";

export default function profile() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  var accounts;
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
    <div>
      <button
        onClick={() => {
          connectWallet();
        }}
      >
        connect to MetaMask
      </button>
      profile
      <div>주소: {account}</div>
    </div>
  );
}
