import erc721Abi from "../src/erc721Abi";
import IpfsApi from "ipfs-api";
import { useState } from "react";
import styles from "../styles/create.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Icon, TextArea, Button, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function create({ web3, account, walletType }) {
  const [buffer, setBuffer] = useState([]);
  const [ipfsLink, setIpfsLink] = useState("");
  const [newErc721addr, setNewErc721Addr] = useState("0x787b226eA9B0c0b8f3558EA4b9aE088fDE7B7b3B");
  const [newKip17addr, setNewKip17Addr] = useState("0x038959C3Ed4A26C803c07EF476049F6aE9dFB288");
  const [nftDesc, setNftDesc] = useState("");
  const [nftName, setNftName] = useState("");
  const [isMint, setIsMint] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const ipfsApi = IpfsApi("ipfs.infura.io", "5001", { protocol: "http" });

  const moveToHome = () => {
    router.push("/");
  };
  const changeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const fileBuffer = Buffer(reader.result);
      setBuffer(fileBuffer);
    };
  };

  const handleSubmission = async () => {
    ipfsApi.files.add(buffer, (error, result) => {
      if (error) {
        console.log(error);
      }
      setIpfsLink("https://gateway.ipfs.io/ipfs/" + result[0].hash);
    });
  };

  const createNewNFT = async () => {
    let tokenContract;
    let newTokenId;

    if (walletType === "eth") {
      tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr, {
        from: account,
      });
      tokenContract.options.address = newErc721addr;
      newTokenId = await tokenContract.methods.mintNFT(account, ipfsLink).send();
    } else {
      tokenContract = await new caver.klay.Contract(erc721Abi, newKip17addr, {
        from: account,
      });
      tokenContract.options.address = newKip17addr;
      newTokenId = await tokenContract.methods.mintNFT(account, ipfsLink).send({ from: account, gas: 0xf4240 });
    }
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    setIsMint(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.createContainer}>
        <div className={styles.mainContainer}>
          <div>
            <h1>Create New Item</h1>
            <span className={styles.grayFont}>
              <span style={{ fontSize: "10px" }} className={styles.require}>
                *
              </span>{" "}
              Required fields
            </span>
          </div>
          <Divider />
          <div>
            <p className={styles.contentFont}>
              Image{" "}
              <span style={{ fontSize: "16px" }} className={styles.require}>
                *
              </span>
            </p>
            <p className={styles.grayFont}>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
            <div className={styles.selectFile}>
              <label for="fileInput">
                {image ? <img for="fileInput" src={image} alt="preview image" className={styles.selectedImage} /> : <Icon name="file image outline" size="huge" />}
              </label>
              <input type="file" name="file" onChange={changeHandler} id="fileInput" />
            </div>
            <br></br>
            <div>
              <Button content="Create IPFS Hash" onClick={handleSubmission} />
              {ipfsLink ? <div>IPFS Link: {ipfsLink}</div> : ""}
            </div>
          </div>
          <br></br>
          <div className={styles.contentContainer}>
            <p className={styles.contentFont}>
              Name{" "}
              <span style={{ fontSize: "16px" }} className={styles.require}>
                *
              </span>
            </p>
            <Input
              placeholder="Item name"
              fluid
              size="big"
              onChange={(e) => {
                setNftName(e.target.value);
              }}
            />
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.contentFont}>Description</p>
            <TextArea
              placeholder="Tell us more"
              style={{ minHeight: 100, width: "100%", borderColor: " rgba(0,0,0,0.6)" }}
              onChange={(e) => {
                setNftDesc(e.target.value);
              }}
            />
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.contentFont}>
              Account{" "}
              <span style={{ fontSize: "16px" }} className={styles.require}>
                *
              </span>
            </p>
            <p className={styles.contentValue}>{account ? account : <p style={{ color: "#b91528", fontWeight: "600" }}>Please connect Account first!!</p>}</p>
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.contentFont}>
              Block Address{" "}
              <span style={{ fontSize: "16px" }} className={styles.require}>
                *
              </span>
            </p>
            <p className={styles.contentValue}>
              {newErc721addr ? newErc721addr : newKip17addr ? <p style={{ color: "#b91528", fontWeight: "600" }}>Please connect Block Address first!!</p> : ""}
            </p>
          </div>

          <div className={styles.buttonContainer}>
            <Button size="big" icon labelPosition="left" onClick={moveToHome}>
              <Icon name="arrow left" />
              Go Home
            </Button>
            <Button size="big" content="Create NFT" primary onClick={createNewNFT} />
          </div>
          <div className={styles.contentContainer}>
            {" "}
            {isMint ? (
              <p className={styles.completedContainer}>
                <Icon name="check" size="big" />
                Completed Create!!
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
