import Erc721 from "./Erc721";

function TokenList({ web3, account, nftlist, newErc721addr, newKip17addr, walletType, tokenContract, myToken }) {
  return (
    <div className="tokenlist">
      <Erc721 web3={web3} account={account} nftlist={nftlist} newErc721addr={newErc721addr} walletType={walletType} />
    </div>
  );
}

export default TokenList;
