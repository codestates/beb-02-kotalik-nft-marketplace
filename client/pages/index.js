import { useState, useEffect } from "react";
import Web3 from "web3";
import { Grid, Icon, Form, Divider, Button } from "semantic-ui-react";
import styles from "../styles/index.module.css";
import Link from "next/link";

export default function Home() {
  // const [web3, setWeb3] = useState();
  // const [account, setAccount] = useState("");
  // var accounts;
  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     // window.ethereum이 있다면
  //     try {
  //       const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
  //       setWeb3(web);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, []);
  // const connectWallet = async () => {
  //   accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });

  //   setAccount(accounts[0]);
  // };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.Contents}>
        <div className={styles.mainContent}>
          <div className={styles.leftContent}>
            <div className={styles.textContent}>
              <span>Discover, collect, and sell extraordinary NFTs</span>
              <p>OpenSea is the world's first and largest NFT marketplace</p>
            </div>
            <div className={styles.btnContainer}>
              <Link href="/explore">
                <Button content="Explore" primary size="huge" toggle />
              </Link>
              <Link href="/create">
                <Button basic color="blue" content="Create" size="huge" toggle />
              </Link>
            </div>
            <div className={styles.bottomText}>
              <Icon name="play circle" />
              Learn more about OpenSea
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.contentContainer}>
              <img
                src="/images/rightContent.jpeg"
                alt="content"
                style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
              />
              <div className={styles.desc}>
                <div className={styles.user}>
                  <Icon name="user circle" size="huge" />
                  <div className={styles.userText}>
                    <span>FROM A SPACE</span>
                    <div>mingiLee</div>
                  </div>
                </div>
                <div style={{ marginRight: "20px" }}>
                  <Icon name="info circle" size="large" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
