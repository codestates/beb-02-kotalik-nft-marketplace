import Erc721 from "./Erc721";

function TokenList({ web3, account, erc721list, newErc721addr, tokenContract, myToken }) {
  return (
    <div className="tokenlist">
      <Erc721 web3={web3} account={account} erc721list={erc721list} newErc721addr={newErc721addr} />
    </div>
  );
}

export default TokenList;
