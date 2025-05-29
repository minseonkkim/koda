import axios from "axios";

const BASE_URL = "https://api.etherscan.io/v2/api";
const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const axiosInstance = axios.create({ baseURL: BASE_URL });

const USDT_DECIMALS = 6;

export async function fetchUSDTBalance(
  walletAddress: string,
  contractAddress: string
) {
  const { data } = await axiosInstance.get("", {
    params: {
      chainid: 1,
      module: "account",
      action: "tokenbalance",
      contractaddress: contractAddress,
      address: walletAddress,
      tag: "latest",
      apikey: API_KEY,
    },
  });

  console.log(data);

  if (data.status !== "1") throw new Error("잔고 조회 실패");

  return Number(data.result) / 10 ** USDT_DECIMALS;
}

export async function fetchUSDTTransactions(
  walletAddress: string,
  contractAddress: string
) {
  const { data } = await axiosInstance.get("", {
    params: {
      chainid: 1,
      module: "account",
      action: "tokentx",
      contractaddress: contractAddress,
      address: walletAddress,
      page: 1,
      offset: 5,
      sort: "desc",
      apikey: API_KEY,
    },
  });

  console.log(data);

  if (data.status !== "1") throw new Error("트랜잭션 조회 실패");

  return data.result;
}
