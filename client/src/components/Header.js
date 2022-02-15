import React, { useState } from "react";
import { Input, Icon } from "semantic-ui-react";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header({ connectWallet, web3, account }) {
  const [isLogin, setIsLogin] = useState(false);
  const loginButton = (e) => {
    setIsLogin(true);
    connectWallet();
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
              <Icon name="book" size="large" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
