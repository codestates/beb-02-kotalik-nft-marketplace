import React, { useState, useEffect } from "react";
import { Input, Icon } from "semantic-ui-react";
import styles from "./Header.module.css";
import Link from "next/link";
import axios from "axios";

export default function Header({ connectWallet, connectKaikas, web3, account }) {
  const [isLogin, setIsLogin] = useState(false);

  const loginButton = (e) => {
    connectWallet();
    setIsLogin(true);
  };

  const kaikasLoginButton = (e) => {
    connectKaikas();
    setIsLogin(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.Container}>
        <Link href="/">
          <div className={styles.logo}>
            <img src="/images/opensea.png" alt="logo" style={{ display: "flex", width: "40px", margin: "25px" }} />
            <span>OpenSea</span>
          </div>
        </Link>
        <Input icon="search" placeholder="Search items, collections, and accounts" style={{ width: "50rem", height: "45px" }} />
        <ul className={styles.nav}>
          <li>
            <Link href="/myCollection">
              <div>My Collection</div>
            </Link>
          </li>
          <li>
            <Link href="/explore">
              <div>Explore</div>
            </Link>
          </li>
          <li>
            <Link href="/create">
              <div>Create</div>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <div>{isLogin ? <Icon name="user circle" size="large" /> : <Icon name="user circle outline" size="large" />}</div>
            </Link>
          </li>
          <li>
            <div onClick={loginButton}>
              <img className={styles.icon} src="/images/icon_metamask.jpg" />
            </div>
          </li>
          <li>
            <div onClick={kaikasLoginButton}>
              <img className={styles.icon} src="/images/icon_kaikas.png" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
