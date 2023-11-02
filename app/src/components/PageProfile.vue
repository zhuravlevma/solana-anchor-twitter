<script setup>
import { ref, watchEffect } from "vue";
import { fetchTweets, authorFilter } from "@/api";
import TweetForm from "@/components/TweetForm";
import TweetList from "@/components/TweetList";
import { useAnchorWallet } from "solana-wallets-vue";

const tweets = ref([]);
const loading = ref(true);

watchEffect(() => {
  if (!useAnchorWallet().value) return;
  fetchTweets([authorFilter(useAnchorWallet().value.publicKey.toBase58())])
    .then((fetchedTweets) => (tweets.value = fetchedTweets))
    .finally(() => (loading.value = false));
});

const addTweet = (tweet) => tweets.value.push(tweet);
</script>

<template>
  <!-- TODO: Check connected wallet -->
  <div v-if="true" class="border-b px-8 py-4 bg-gray-50">
    {{
      useAnchorWallet().value
        ? useAnchorWallet().value.publicKey.toBase58()
        : ""
    }}
  </div>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
