import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import contract from "../artifacts/contracts/MyNFT.sol/MyNFT.json";
import Configs from "../configs";

const web3 = createAlchemyWeb3(Configs.API_URL);

const nftContract = new web3.eth.Contract(
  contract.abi as any,
  Configs.CONTRACT_ADDRESS
);

async function mintNFT(tokenURI: string, userPublicKey: string) {
  try {
    const nonce = await web3.eth.getTransactionCount(
      Configs.PUBLIC_KEY,
      "latest"
    ); // get latest nonce

    // console.log("nonce", nonce);

    const { rawTransaction } = await web3.eth.accounts.signTransaction(
      {
        from: Configs.PUBLIC_KEY,
        to: Configs.CONTRACT_ADDRESS,
        nonce: nonce,
        gas: Configs.TRANSACTION_GAS,
        data: nftContract.methods.mintNFT(userPublicKey, tokenURI).encodeABI(),
      },
      Configs.PRIVATE_KEY
    );
    if (!rawTransaction) {
      throw new Error("Something went wrong when signing your transaction");
    }
    web3.eth.sendSignedTransaction(rawTransaction, function (err, hash) {
      if (!err) {
        console.log(
          "The hash of your transaction is: ",
          hash,
          "\nCheck Alchemy's Mempool to view the status of your transaction!"
        );
      } else {
        console.log(
          "Something went wrong when submitting your transaction:",
          err
        );
      }
    });
  } catch (error) {
    console.error("Minting failed:", error);
  }
}

// mintNFT(
//   "https://gateway.pinata.cloud/ipfs/QmeJt1fHUgxym29Q7LMTLVKkWyacLryoYDe9heNZBoAPgf",
//   "0x8b4d8aa3593bbcd5c12805dfd6182f0327884f8f"
// );
mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmeJt1fHUgxym29Q7LMTLVKkWyacLryoYDe9heNZBoAPgf",
  "0xdda08b830f47925C2cc67Dc0C61f80aAB733EB2e"
);
