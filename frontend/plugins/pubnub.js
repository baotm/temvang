import Vue from 'vue'
import PubNub from 'pubnub-vue'
Vue.use(PubNub, {
    publishKey: "pub-c-2ecffcb0-ec4c-44c3-a88a-6f19b13057c3",
    subscribeKey: "sub-c-1db3ee38-8f0e-11eb-968e-467c259650fa",
})
