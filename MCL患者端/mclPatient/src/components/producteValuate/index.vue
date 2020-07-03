<template>
    <div>
      <mt-header title="评价" fixed class="borderBottom">
        <div slot="left">
          <header-back>
            <mt-button icon="back"></mt-button>
          </header-back>
        </div>
      </mt-header>
      <div class="marginHeader">
        <div class="content">
            <div class="borderBottom">
              <textarea v-model.trim="param.ReviewContent" id="" cols="30" rows="10" placeholder="请输入您的评价"></textarea>
            </div>

            <div class="img-preview">
              <div class="img-wrap clear">
                <!--<div class="img-item float_left">-->
                  <!--<img src="./../../assets/images/product.jpg" alt="">-->
                  <!--<i class="del"></i>-->
                <!--</div>-->
                <!--<div class="img-item add-pic float_left"></div>-->
                <div id="divimg"></div>
                <div class="fileimg">
                  <input @change="chand" id="filepic" class="files" type="file" name="Picture" />
                  <div></div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="text-center">
        <mt-button type="danger" class="add_btn" @click="submit()">评价</mt-button>
      </div>

      <!--<div class="fix_bottom">
        <div class="check-area"><i class="check-i" :class="(param.isAnonymous==1) && 'checked'" @click="toggleCheck()"></i><span>匿名</span></div>
        <mt-button type="danger" class="valuate-btn" @click="submit()">评价</mt-button>
      </div>-->
    </div>
</template>

<script>
    export default {
        name: "index",
        data:()=>({
          checkClass: false,
          reviewcontent:'',
          picture:'',
          pictureurl:'',
          param:{
            OrderKey:'',
            ProKey: '',
            isAnonymous: 0,
            ReviewContent:'',
            Picture:''
          }
        }),
        methods:{
          toggleCheck(event){
            this.param.isAnonymous  = (this.param.isAnonymous==1) ? 0 : 1;
          },
          //加载单号
          loadg(){
            if(this.$route.query.goodsId){
              this.param.OrderKey = this.$route.query.orderId;
              this.param.ProKey = this.$route.query.goodsId;
            }
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
          //上传图片
          chand:function(e){
            let file = e.target.files[0];
            if(file == undefined){
              return;
            }
            this.preview1(file);
            this.picbase('filepic',(data)=>{
              var arrUrl=data.lastIndexOf(',');
              var str2= data.substring(arrUrl + 1, data .length);
              this.picture = str2;
              let url = "UserInterface/UploadPhotos.ashx";
              let paramp = {
                BinaryStream: this.picture
              };
              this.$post(url,paramp).then((data)=>{
                if(data.rspcode != 1){
                    return;
                }
                this.param.Picture= data.data.imgUrl;
              })
            })
          },
          //显示图片
          preview1(file){
            var img = new Image(),
              url = img.src = URL.createObjectURL(file);
            var $img = img;
            img.onload = function() {
              URL.revokeObjectURL(url);
              document.getElementById('divimg').innerText='';
              $img.style.width=1.0+'rem';
              $img.style.height=1.0+'rem';
              document.getElementById('divimg').append($img);
            }
          },
          //  提交评价
          submit(){
            let url = "UserInterface/user/addEvaluate.ashx";
            if(this.param.ReviewContent == ""){
              this.$Toast("评价内容不能为空")
              return;
            }
            this.$Indicator.loading();
            this.$post(url,this.param).then((data)=>{
              this.$Indicator.close();
              if(data.rspcode !=1){
                return;
              };
              this.$Toast("评价成功");
              this.$router.push("/wx_Entrance/personal")
            })
          }
        },
        mounted(){
          this.loadg();
        }
    }
</script>

<style scoped lang="scss">
  @import "@/assets/css/base.scss";
  .content{
    padding: 0.15rem;
    margin-top: 0.05rem;
    background: white;
  }
  textarea{
    resize: none;
    border: none;
    width: 100%;
    padding: 0.05rem;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetica", "STHeiTi", "sans-serif";
  }
  .img-preview{

    .img-item{
      position: relative;
      width: 0.80rem;
      height: 0.80rem;
      margin-right: 5px;
      &:last-child{
        margin-right: 0;
      }
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
      .del{
        width: 0.18rem;
        height: 0.18rem;
        display: block;
        background: url("https://resource.jtsc.club/cha@2x.png") no-repeat center;
        background-size: cover;
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
    .add-pic{
      background: url("https://resource.jtsc.club/tianjia@2x.png") no-repeat center;
      background-size: cover;
    }
  }

  .img-preview{
    margin-top: 10px;
  }


  //底部button
  .fix_bottom{
    background: white;
    border-top: 1px solid $boderE;
    height: 0.55rem;
    display: flex;
    padding: 0 0.1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
  .valuate-btn{
    width: 2.10rem;
  }
  .check-area{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    .check-i{
      margin-right: 5px;
    }
  }
  .fileimg{
    width: 1.0rem;
    height: 1.0rem;
    position: relative;
    float: left;
  }
  input[type=file]{
    width: 1.0rem;
    height: 1.0rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    opacity: 0;
  }
  .fileimg div{
    width: 1.0rem;
    height: 1.0rem;
    background: url("https://resource.jtsc.club/tianjia@2x.png") no-repeat center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  #divimg{
    float: left;
    img{
      width: 1.0rem;
      height: 1.0rem;
    }
    margin-right: 0.1rem;
  }
</style>
