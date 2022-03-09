<template>
  <div>2
    <button @click="go">ann</button>
  </div>
</template>

<script>
export default {
  methods: {
    go() {
       let symptom = this.$store.state.symptom;
     let str = this.$route.path.match(/symptom(\S*)/)[1];
    let i = symptom.findIndex( item => item.sKey == str)
      if(symptom.length -1 ==  i) {
        // this.$router.push(`/symptom${symptom[i+1].sKey}`)
        console.log('end');
        // this.$store.commit("setsymptom", symptom);
      }else {
         this.$router.push(`/symptom${symptom[i+1].sKey}`)
      }
    }
  }
}
</script>

<style>

</style>