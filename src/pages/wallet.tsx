import { useState } from 'react'
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import bs58 from 'bs58'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import solanaLogo from '../assets/logo.svg'
import tsLogo from '../assets/ts.png'
import wallet from '../assets/wallet.png'

const Wallet = () => {

  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [balance, setBalance] = useState<string | number>(0)
  const [net, setNet] = useState<"devnet" | "testnet" | "mainnet-beta">("testnet")


  const getPublicKey = () => {
    try {
      const privateKeyUnit8 = bs58.decode(privateKey)
      const keyPair = Keypair.fromSecretKey(privateKeyUnit8);
      const publicKey = keyPair.publicKey.toBase58()
      setPublicKey(publicKey)
    } catch (e) { setPublicKey("Invalid private key") }
  }

  const getBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl(net));
      const address = new PublicKey(publicKey);
      const value = await connection.getBalance(address)
      setBalance(value);
    } catch (e) {
      setBalance("Failed to get balance")
    }
  }
  return (
    <>
      <div>
        <a href="https://www.soldev.app/course/" target="_blank">
          <img src={solanaLogo} className="logo" alt="solana logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="" target="_blank">
          <img src={tsLogo} className="logo ts" alt="typescript logo" />
        </a>
        <a href="" target="_blank">
          <img src={wallet} className="wallet logo" alt="wallet logo" />
        </a>
      </div>
      <h1>Solana + Vite + React + TS</h1>
      <div className='input-group'>
        <div className='text-group'>
          <h2>private key</h2>
          <input type="text" onChange={e => { setPrivateKey(e.target.value); }} value={privateKey} />
        </div>
        <button className='get-private-key-btn' onClick={() => getPublicKey()} disabled={privateKey == "" ? true : false}>{'>'}</button>
        <div className='text-group'>
          <h2>public key</h2>
          <input type="text" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
        </div>
      </div>
      <div className="balance">
        <div className="net-group">
          <input type="radio" className='net-radio' name="net" id="main" onChange={() => { setNet("mainnet-beta"); }} />
          <label className='net net-label' htmlFor="main">Mainnet</label>
          <input type="radio" className='net-radio' name="net" id="test" onChange={() => { setNet("testnet"); }} />
          <label className='net net-label' htmlFor="test">Testnet</label>
          <input type="radio" className='net-radio' name="net" id="dev" onChange={() => { setNet("devnet"); }} />
          <label className='net net-label' htmlFor="dev">Devnet</label>

        </div>
        <div className='balance-group' >
          <button className='get-private-key-btn' onClick={() => getBalance()} disabled={publicKey && publicKey != "Invalid private key" ? false : true} >balance</button>
          <input type="text" value={balance} disabled={publicKey && publicKey != "Invalid private key" ? false : true} readOnly />
        </div>
      </div>
    </>
  )
}

export default Wallet
