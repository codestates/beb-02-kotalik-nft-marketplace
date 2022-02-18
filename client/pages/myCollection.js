import TokenList from "../src/components/TokenList";
import { useState, useEffect } from "react";
import erc721Abi from "../src/erc721Abi";
import kip17Abi from "../src/kip17Abi";
import { Button, Divider, Icon } from "semantic-ui-react";
import styles from "../styles/myCollection.module.css";

export default function myCollection({ web3, caver, account, walletType }) {
  const [nftlist, setNftlist] = useState([]);
  // newErc721addr 에는 배포된 블록 주소값을 넣으면 됩니당
  // erc721 0xC9E8a8AD7C0bAc7C04B5B14b82564EEea4DA86ff
  // kip17   0xce940F5D2d13478A912D723C26f9Ee0f03aFcbb3
  const [newErc721addr, setNewErc721Addr] = useState("0xC9E8a8AD7C0bAc7C04B5B14b82564EEea4DA86ff");
  const [newKip17addr, setNewKip17Addr] = useState("0xce940F5D2d13478A912D723C26f9Ee0f03aFcbb3");

  useEffect(() => {
    walletType === 'eth' ? addNewErc721Token() : addNewKip17Token();
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
        setNftlist((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  };

  const addNewKip17Token = async () => {
    const tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr);
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
        setNftlist((prevState) => {
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
          <TokenList web3={web3} caver={caver} account={account} nftlist={nftlist} newErc721addr={newErc721addr} newKip17addr={newKip17addr} walletType={walletType} mine={true} />
        </div>
      </div>
    </>
  );
}
