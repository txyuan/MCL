<template>
    <div>
      <mt-header title="晒单">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="evaluate_zi">
        <textarea placeholder="请输入内容" v-model.trim="text" ref="count" maxlength="30"></textarea>
        <p><span>{{number}}</span>/30</p>
      </div>
      <div class="evaluate_img">
        <div class="evaluate_imgli">
          <div class="real_card1" v-for="(item,index) in listImg" :key="index">
            <img :src="item" id="" class="zindex" />
            <span @click="delimg(index)"></span>
          </div>

          <div class="real_card3" v-show="isUploadBtn">
            <img :src="imgurl"/>
            <input type="file" name="uploadedImage" @change="change" value="" accept="image/*" id="uploadedBtn"/>
          </div>
        </div>
      </div>
      <span class="evaluate_btn" @click="submit">发布</span>
    </div>
</template>

<script>
    // import addimg from "@/assets/images/tianjia@2x.png"  //默认图片
    export default {
        name: "evaluate",
        data: ()=>({
          imgurl:'https://resource.jtsc.club/',
          isUploadBtn: true, //是否显示上传按钮
          listImg:[],   //base64图片
          text:''
        }),
        computed:{
          number(){
            var len = this.text.length;
            return len;
          }
        },
        methods:{
          change(e){
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);
            //this.listImg.push(url);
            //最多显示3张图片
            if(this.listImg.length >= 3){
              this.isUploadBtn = false;
            }
            this.$Indicator.loading();
            //base图片转换在线地址
            this.picbase('uploadedBtn',(data)=>{
              var arrUrl=data.lastIndexOf(',');
              var base64Img = data.substring(arrUrl + 1, data.length);
              this.uploadImg(base64Img).then((data)=>{
                this.$Indicator.close();
                if(data.rspcode != 1){
                  this.$Toast("上传图片可能过大，请重试。")
                  return;
                }
                this.listImg.push(data.data.imgUrl);
                e.target.value = "";
                //隐藏上传按钮
                if(this.listImg.length >= 3){
                  this.isUploadBtn = false;
                }
              })
            })
          },
          //评价图片1
          fileimg(e){
            // let param = new FormData(); //创建form对象
            // param.append('uploadedImage',file);//通过append向form对象添加数据
            // let config = {
            //   headers:{'Content-Type':'multipart/form-data'}
            // };
            //添加请求头
            // let urls = "UserInterface/UploadImage.ashx"
            // axios.post('http://bq.kaopudian.cn/UserInterface/UploadImage.ashx', param, config).then(response => {
            //   if (response.data.rspcode != 1) {
            //     return;
            //   }
            //   this.idcardFrontPhotoUrl1=response.data.fileUrl;
            // })
          },
          //删除图片
          delimg(index){
            this.listImg.splice(index,1);
            //显示上传按钮
            if(this.listImg.length < 3){
              this.isUploadBtn = true;
            }
          },
          //提交评价
          submit(){
            let url = "UserInterface/ShareOrder.ashx";
            let {text,listImg} = this.$data;
            let param = {
              OrderDetailKey: this.$route.query.key,
              Remark: text,
              Image1Url: listImg[0] || "",
              Image1Ur2: listImg[1] || "",
              Image1Ur3: listImg[2] || "",
            }
            if(this.text == ""){
              this.$Toast("晒单内容不能为空")
              return;
            }
            if(this.listImg.length == 0){
              this.$Toast("晒单图片不得少于一张")
              return;
            }
            this.$Indicator.loading();
            this.$post(url,param).then((data)=>{
              this.$Indicator.close();
              if(data.rspcode !=1){
                return;
              };
              this.$Toast("晒单成功");
              this.$router.push(`/sunsuccess?key=${data.data.sKey}`);
            })
          },
          //上传base64换取在线地址
          uploadImg(base64Img){
            let url = "UserInterface/UploadPhotos.ashx";
            let param = {
              BinaryStream: base64Img
            };
            return this.$post(url,param)
          },
          //图片转base64
          picbase(els, callback){
            //els 为input的id  callback为获取base64码的回调函数
            getFileImg(els, callback)
            function getFileImg(els, callback) {
              function getFullUrl() {
                var input = document.getElementById(els);
                var f = input.files[0] || input.files.item(0);
                var url = window.URL.createObjectURL(f);
                var filemaxsize = 1024 * 10; //10M

                // if(f.size > filemaxsize) {
                // alert('上传的图片不能大于10M');
                // input.value = '';
                // return
                // }
                return url;
              }
              function convertImgToBase64(url, callback, outputFormat) {
                var canvas = document.createElement('CANVAS'),
                  ctx = canvas.getContext('2d'),
                  img = new Image;
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                  canvas.height = img.height;
                  canvas.width = img.width;
                  ctx.drawImage(img, 0, 0);
                  var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                  callback.call(this, dataURL, 0.1);
                  canvas = null;
                };
                img.src = url;
              }
              var imgimgUrl = getFullUrl();
              convertImgToBase64(imgimgUrl, callback)
            }
          },

        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .evaluate_zi{
    background: #fff;
  }
.evaluate_zi textarea{
  width: 94%;
  resize: none;
  padding: 0.1rem 3%;
  border: none;
  height: 1.0rem;
  color: #333;
  font-size: 0.14rem;
  line-height: 0.2rem;
}
 .evaluate_zi p{
    width: 94%;
    background: #fff;
    color: #909090;
    padding: 0.1rem 3%;
    text-align: right;
  }
  .evaluate_img{
    width: 94%;
    background:#fff;
    padding: 0 3%;
  }
.evaluate_img .evaluate_imgli{
  width: 100%;
  height: 1.4rem;
  border-top: 1px solid #E0E0E0;
}
  .evaluate_btn{
    display: block;
    width: 94%;
    height: 0.44rem;
    background: #FF1E41;
    text-align: center;
    line-height: 0.44rem;
    border-radius: 4px;
    margin: 0 auto;
    color: #fff;
    margin-top: 0.3rem;
  }
  .real_card1,.real_card2,.real_card3{
    width: 32%;
    height: 1.1rem;
    position: relative;
    overflow: hidden;
    float: left;
    margin-top: 0.15rem;
    img{
      width: 100%;
      height: 1.1rem;
      position: absolute;
      border: 1px solid #eee;
      box-sizing: border-box;
      z-index: 1;
      &.zindex{
        z-index: 3;
      }
    }
    input{
      width: 100%;
      height: 1.1rem;
      position: absolute;
      opacity: 0;
      z-index: 2;
    }
    span{
      width: 0.18rem;
      height: 0.18rem;
      display: block;
      position: absolute;
      right: 0.04rem;
      top: 0.04rem;
      background: url("https://resource.jtsc.club/cha@2x.png") no-repeat center center;
      background-size: 0.18rem;
      z-index: 4;
    }
  }
  .real_card2,.real_card3{
    margin-left: 2%;
  }
</style>
