import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import styles from "../../styles/id.module.css";
import erc721Abi from "../../src/erc721Abi";
const Post = ({ web3, account, erc721list }) => {
  const [token, setToken] = useState([]);
  // newErc721addr 에는 배포된 블록 주소값을 넣으면 됩니당
  // erc7210 xC9E8a8AD7C0bAc7C04B5B14b82564EEea4DA86ff
  // kip17   0xce940F5D2d13478A912D723C26f9Ee0f03aFcbb3
  const [newErc721addr, setNewErc721Addr] = useState("0xce940F5D2d13478A912D723C26f9Ee0f03aFcbb3");
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    //const tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr);
    const tokenContract = await new caver.klay.Contract(erc721Abi, newErc721addr);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    let tokenURI = await tokenContract.methods.tokenURI(id).call();
    setToken({ name, symbol, id, tokenURI });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div key={token.tokenId} className={styles.tokenContainer}>
            <img
              src={token.tokenURI}
              alt={token.id}
              style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
            />
            <div className={styles.desc}>
              <div className={styles.user}>
                <Icon name="user circle" size="big" />
                <div className={styles.userText}>
                  <span>{token.name}</span>
                  <div>{token.symbol}</div>
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
  );
};

export default Post;
