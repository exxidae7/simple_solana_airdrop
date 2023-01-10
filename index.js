const {
    Connection ,
    PublicKey ,
    clusterApiUrl ,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async() => { 
    try {
        const connection = new Connection(clusterApiUrl("devnet") , 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet Balance is ${walletBalance}`)
    }catch (err) {
        console.error(err)
    }
}

const airDrop = async() => { 
    try {
        const connection = new Connection(clusterApiUrl('devnet') , 'confirmed')
        const airDropSignature = await connection.requestAirdrop(publicKey , 2 * LAMPORTS_PER_SOL)
        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: airDropSignature,
          });
    }catch (err) {
        console.error(err)
    }
}

const main = async() => {
    await getWalletBalance()
    await airDrop()
    await getWalletBalance()
}
main()