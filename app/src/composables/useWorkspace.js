import { computed } from "vue";
import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "../../../target/idl/solana_twitter.json";

const programID = new PublicKey(idl.metadata.address);
let workspace = null;

export const useWorkspace = () => workspace;
const preflightCommitment = "finalized";
const commitment = "finalized";

export const initWorkspace = () => {
  const connection = new Connection("http://127.0.0.1:8899");
  const provider = computed(
    () =>
      new AnchorProvider(connection, useAnchorWallet().value, {
        preflightCommitment,
        commitment,
      })
  );
  const program = computed(() => new Program(idl, programID, provider.value));
  workspace = {
    connection,
    provider,
    program,
  };
};
