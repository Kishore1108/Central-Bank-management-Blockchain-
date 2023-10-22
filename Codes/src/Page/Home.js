import React,{useState} from "react";
import {Button,Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contract } from "../utils/connector";

function Home() {
const [Money, setMoney] = useState("");
const [withdrawMoney, setWithdrawMoney] = useState("");
const [transferMoney, setTransferMoney] = useState("");
const [Bal, setBal] = useState("");
const [address, setaddress] = useState("");
const [Wallet, setWallet] = useState("");


  const handleAddress = (e) => {
    setaddress(e.target.value)
  }

 const handleMoney = (e) => {
  setMoney(e.target.value)
 }

 const handleWithdrawMoney = (e) => {
  setWithdrawMoney(e.target.value)
 }

 const handleTransferMoney = (e) => {
  setTransferMoney(e.target.value)
 }

 const checkBalance = async () => {
   let bal = await contract.checkBalance()
    setBal(bal.toString())
 }

 const mint = async () => {
  try {
    let tx = await contract.mintMoney(Money.toString())
    let txWait =  await tx.wait()
    alert(txWait.transactionHash  )
  } catch (error) {
   alert(error)  
  }
 }

  const withdraw = async () => {
    try {
      let tx = await contract.withdrawMoney(withdrawMoney.toString())
      let txWait = await tx.wait()
      alert(txWait.transactionHash)
    } catch (error) {
      alert(error)
    }
  }

  const transfer = async () => {
    try {
      let tx = await contract.transferFunds(address,transferMoney.toString())
      let txWait = await tx.wait()
      alert(txWait.transactionHash)
    } catch (error) {
      alert(error)
    }
  }

  const handleWallet = async () => {
    if (!window.ethereum) {
      return alert('please install metamask');
    }

    const addr = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    
    setWallet(addr[0])

  }


  return (
  <div>
   <h1 style={{marginTop:"30px", marginBottom:"80px"}}>Bank on Blockchain</h1>
   {!Wallet ?

      <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
      : 
        <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0,6)}....{Wallet.slice(-6)}</p>
   }
    <Container>
     <Row>
      <Col>
       <div>
        {/* <label>Mint Money</label><br /> */}
        <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleMoney} type="number" placeholder="Enter money" value={Money} /> <br />
        <Button onClick={mint} style={{ marginTop: "10px" }} variant="primary">Mint</Button>
       </div>
      </Col>
      <Col>
       <div>
        {/* <label>Withdraw Money</label><br /> */}
        <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleWithdrawMoney} type="number" placeholder="Enter money" value={withdrawMoney} /> <br />
        <Button onClick={withdraw} style={{ marginTop: "10px" }} variant="primary">Withdraw</Button>
       </div>
      </Col>
     </Row>
     <Row style={{marginTop:"100px"}}>
      <Col>
       <div>
        {/* <label>Address</label><br /> */}
        <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleAddress} type="string" placeholder="Enter address" value={address} /> <br />

        {/* <label>Transfer Money</label><br /> */}
        <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleTransferMoney} type="number" placeholder="Enter money" value={transferMoney} /> <br />
        <Button onClick={transfer} style={{ marginTop: "10px" }} variant="primary">Transfer</Button>
       </div>
      </Col>
      <Col>
       <div>
        {/* <label>Check Balance</label><br /> */}
        <Button onClick={checkBalance} style={{ marginTop: "10px" }} variant="primary">Check Balance</Button>
        <p>{Bal}</p>
       </div>
      </Col>
      </Row>
    </Container>
    
  </div>
  )
}

export default Home;
