<template>
    <div>
      <router-link :to="`/${detailPage}/${item.businessId}`">
        <div class="merch_cont">
          <div class="merch_list">
            <img :src="item.businessImage" />
            <div class="merch_menu">
              <h3>{{item.businessName}}</h3>
              <p>
                <!--<span class="yellows" v-for="(iten,inex) in item.subjectLists" :key="inex">{{iten.subjectName}}</span>-->
                <span class="yellows" >{{item.subjectName}}</span>
                <label>{{item.distance}}</label>
              </p>
              <i>{{item.opularityValue}}</i>
            </div>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "item",
        props:['item',"detailPage"],
        data:()=>({}),
        methods:{

        }
    }
</script>

<style scoped lang="scss">
  .merch_cont{
    padding: 0.1rem 2%;
    background: #fff;
    margin-top: 0.06rem;
    overflow: hidden;
  img{
    height: 0.8rem;
    width: 0.8rem;
    float: left;
  }
  .merch_menu{
    float: left;
    margin-left: 2%;
    width: 74%;
  h3{
    font-size: 0.16rem;
    font-weight: normal;
    color: #333;
  }
  p{
    overflow: hidden;
    margin-top: 0.08rem;
    span{
      display: block;
      float: left;
      padding: 0 0.08rem;
      height: 0.20rem;
      line-height: 0.21rem;
      border-radius: 4px;
      margin-right: 2%;
      color: #FF3D3D;
      border: 1px solid #FF3D3D;
      font-size: 0.12rem;
      &.yellows{
         border-color: #FF9F00;
         color: #FF9F00;
       }
      &.blues{
         border-color: #27BF7D;
         color: #27BF7D;
       }
    }
  label{
    float: right;
    display: block;
    line-height: 0.21rem;
    font-size: 0.14rem;
    color: #666;
  }
  }
  i{
    font-style: normal;
    color: #666666;
    font-size: 0.13rem;
    margin-top: 0.08rem;
    display: block;
  }
  }
  }
</style>
