import { useWorkspace } from "@/composables";
import { Tweet } from "../models/Tweet";

export const getTweet = async (publicKey) => {
  console.log(publicKey, "getTweet");
  const { program } = useWorkspace();
  const account = await program.value.account.tweet.fetch(publicKey);
  return new Tweet(publicKey, account);
};
