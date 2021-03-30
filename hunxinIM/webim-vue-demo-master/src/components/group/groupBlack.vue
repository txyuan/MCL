<template>
  <el-dialog title="群组黑名单" :visible.sync="showGroupBlackModel" :modal=false class="groupBlack">
    <div class="groupBlackList">
      <ul v-for="item in groupBlackList" :key="item">
        {{item}}
        <label class="delete-icon">
          <i class="el-icon-remove-outline" @click="select(item)"></i>
        </label>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default{
	data(){
		return {
			showGroupBlackModel: false
		};
	},
	computed: {
		groupBlackList(){
			return this.$store.state.group.groupBlack;
		}
	},
	methods: {
		...mapActions(["onRemoveGroupBlack"]),
		chengeBlackModel(){
			this.$data.showGroupBlackModel = !this.$data.showGroupBlackModel;
		},
		select(key){
			let removeGroupBlackName = key;
			this.onRemoveGroupBlack({
				select_id: this.$store.state.group.groupInfo.gid,
				removeGroupName: removeGroupBlackName
			});
		}
	}
};
</script>
<style scoped lang="less">
.delete-icon {
  position: absolute;
  right: 40px;
}
.groupBlack::v-deep{
	.el-dialog{
		width: 55%;	
	}
}
.groupBlackList{
	text-align: left;
	ul,li{
		list-style: none;
		margin: 0;
    	padding: 0;
	}
}
</style>
