import React from "react";
import { Input, Icon } from "semantic-ui-react";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.Container}>
        <Link href="/">
          <a className={styles.logo}>
            <img src="/images/opensea.png" alt="logo" style={{ display: "flex", width: "40px", margin: "25px" }} />
            <span>OpenSea</span>
          </a>
        </Link>
        <Input icon="search" placeholder="Search items, collections, and accounts" style={{ width: "50rem", height: "45px" }} />
        <ul className={styles.nav}>
          <li>
            <Link href="/explore">
              <a>Explore</a>
            </Link>
          </li>
          <li>
            <Link href="/create">
              <a>Create</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <Icon name="user circle outline" size="large" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
