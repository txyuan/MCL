<template>
  <span>
    <el-popover ref="popover5" placement="top-start" width="360" v-model="showModal">
      <img
        v-for="(v,i) in emojiList"
        :src="require(`../../../static/faces/${v}`)"
        :key="i"
        @click="selectEmoji(i)"
        class="img-style"
      />
    </el-popover>
    <van-icon name="smile-o" size="20" color="rgba(0, 0, 0, 0.65)" v-popover:popover5 />
  </span>
</template>

<script>
import emoji from "../../config/emoji";

export default {
  data() {
    return {
      emojiList: emoji.obj,
      currentEmoji: "",
      showModal: false
    };
  },
  methods: {
    selectEmoji(e) {
	  console.log(e)
      // let value = (this.inpMessage || "") + e;
	  let value = this.inpMessage.substring(0, this.messposnum) + e + this.inpMessage.substring(this.messposnumend) 
      this.$data.showModal = false;
      this.$emit("selectEmoji", value);
    }
  },
  props: {
    inpMessage: String,
	messposnum: Number,
	messposnumend:Number
  }
};
</script>
<style scoped>
.img-style {
  width: 22px;
  margin: 5px;
  cursor: pointer;
}
.img-style:hover {
  background-color: aquamarine;
}
</style>
