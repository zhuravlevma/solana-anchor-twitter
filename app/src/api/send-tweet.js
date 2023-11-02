import { web3 } from "@project-serum/anchor";
import { useWorkspace } from "@/composables";
import { Tweet } from "../models/Tweet";
import { useAnchorWallet } from "solana-wallets-vue";

// 1. Define the sendTweet endpoint.
export const sendTweet = async (topic, content) => {
  const { program } = useWorkspace();

  // 2. Generate a new Keypair for our new tweet account.
  const tweet = web3.Keypair.generate();

  // 3. Send a "SendTweet" instruction with the right data and the right accounts.

  console.log(topic, content, {
    accounts: {
      author: useAnchorWallet().value.publicKey,
      tweet: tweet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [tweet],
  });
  const tx = await program.value.methods
    .sendTweet(topic, content)
    .accounts({
      tweet: tweet.publicKey,
      author: useAnchorWallet().value.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([tweet])
    .rpc();

  console.log(tx, tweet.publicKey);
  const res = await program.value.provider.connection.confirmTransaction(tx);
  console.log(res);
  const collectionPDAAccount =
    await program.value.provider.connection.getAccountInfo(tweet.publicKey);

  console.log(collectionPDAAccount);

  const tweetAccount = await program.value.account.tweet.fetch(tweet.publicKey);

  // 5. Wrap the fetched account in a Tweet model so our frontend can display it.
  return new Tweet(tweet.publicKey, tweetAccount);
};
