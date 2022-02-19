import TokenList from "../src/components/TokenList";
import { useState, useEffect } from "react";
import Web3 from "web3";
import erc721Abi from "../src/erc721Abi";
import kip17Abi from "../src/kip17Abi";
import { Dimmer, Divider, Loader, Segment } from "semantic-ui-react";
import styles from "../styles/explore.module.css";

export default function explore({ caver, web3, account, nftlist, walletType, mine }) {
  const [myToken, setMyToken] = useState([]);
  const [notMyToken, setNotMyToken] = useState([]);
  const [newErc721addr, setNewErc721Addr] = useState("0x787b226eA9B0c0b8f3558EA4b9aE088fDE7B7b3B");
  const [newKip17addr, setNewKip17Addr] = useState("0x038959C3Ed4A26C803c07EF476049F6aE9dFB288");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    saveMyToken();
  }, []);
  const saveMyToken = async () => {
    const tokenContract = "";
    if (walletType === "eth") {
      tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr);
    } else {
      tokenContract = await new caver.klay.Contract(kip17Abi, newKip17addr);
    }
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
        setMyToken((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI, mine: true }];
        });
      }
    }
    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (String(tokenOwner).toLowerCase() !== account) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setNotMyToken((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
    setIsLoading(false);
  };
  return (
    <div style={{ marginTop: "90px" }}>
      <div className={styles.contentContainer}>
        <div className={styles.tokenContainer}>
          <p className={styles.tokenFont}>Explore</p>
          <Divider />
          {isLoading && (
            <Segment basic>
              <div style={{ height: "140px" }}>
                <Dimmer active inverted>
                  <Loader size="large" inverted content="Loading" />
                </Dimmer>
              </div>
            </Segment>
          )}
          {!isLoading && <TokenList web3={web3} account={account} nftlist={notMyToken} newErc721addr={newErc721addr} mine={false} />}
        </div>
      </div>
    </div>
  );
}
