import TokenList from "../src/components/TokenList";
import { useState, useEffect } from "react";
import erc721Abi from "../src/erc721Abi";
import { Button, Divider, Icon } from "semantic-ui-react";
import styles from "../styles/myCollection.module.css";

export default function myCollection({ web3, account }) {
  const [erc721list, setErc721list] = useState([]);
  // newErc721addr 에는 배포된 블록 주소값을 넣으면 됩니당
  const [newErc721addr, setNewErc721Addr] = useState("");
  useEffect(() => {
    addNewErc721Token();
  }, []);

  const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();
    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (String(tokenOwner).toLowerCase() === account) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setErc721list((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  };

  return (
    <>
      <div className={styles.contentContainer}>
        <Divider />
        <div className={styles.tokenContainer}>
          <p className={styles.tokenFont}>My Collections</p>
          <TokenList web3={web3} account={account} erc721list={erc721list} newErc721addr={newErc721addr} mine={true} />
        </div>
      </div>
    </>
  );
}
