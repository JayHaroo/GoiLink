import { CONTRACT_BYTECODE, PROVIDER_URL, PRIVATE_KEY } from '@env';
import { ethers } from "ethers";
import contractABI from "../../hardhat/artifacts/contracts/SmartContract.sol/GoiLinkAgreement.json"; 

const CONTRACT_ABI = contractABI.abi;

export async function deployContract(person1: string, person2: string, title: string, description: string, agreementType: string) {
  try {
    const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, wallet);

    console.log("Deploying contract...");

    // Estimate gas before deploying
    const gasEstimate = await provider.estimateGas({
      from: wallet.address,
      data: CONTRACT_BYTECODE
    });
    console.log("Estimated Gas:", gasEstimate.toString());

    const contract = await factory.deploy({ gasLimit: gasEstimate * BigInt(2) }); // Set high gas limit

    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("Contract deployed at:", address);
    return address;
  } catch (error) {
    console.error("Deployment Error:", error);
    throw error;
  }
}
