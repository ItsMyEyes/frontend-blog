<template>
  <div class="home">
    <Navbar jenis="biasa"/>
    <div class="container">
      <div class="row _3pIz2ph3mCy-m0HPOVNuJj">
        <div class="col-8">
          <h1 class="_148mc1z199eN_DmrO_wsmX _2AMDqwznUmphViYvkIrmbA">Your Writings</h1>
        </div>
        <div class="col-4 mb-3">
          <div class="ListView-buttonSet row">
            <a href="#/" class="_16sebnLLvEN4lKQ4WuitZc col-5 text-center" style="margin-right: 10px;">Open your blog</a>
            <router-link class="_3cSYLCdfQuq6NFBFdSRaTc _16sebnLLvEN4lKQ4WuitZc ListView-actionCreate col-5 text-center" to="/iam/write">Write new post</router-link>
          </div>
        </div>
        <div class="col-12 mt-5">
          <nav class="PostList-category">
            <a class="_2lRNuQhMGqnTvukX3TMvlB _2x3-B-KUle1YztL5Kmy2DJ">
              Public<span class="PostList-categoryCount">{{ data.length }}</span>
            </a>
            <a class="_2lRNuQhMGqnTvukX3TMvlB">
              Drafts<span class="PostList-categoryCount">0</span>
            </a>
          </nav>
          
          <div class="border-bottom-1" v-for="item in data" :key="item.index">
            <div class="card-body">
              <div class="row">
                <div class="col-8">
                  <h1 class="carding">{{ item.title }}</h1>
                  <div class="isi"><p class="mb-none">{{ item.description }}...</p></div>
                </div>
                <div class="col-12" style="margin-top: 8px">
                  <p class="mb-none">
                    <template>Last edited less than a 
                      <TimeAgo :refresh="60" :datetime="new Date(item.updated_date)" locale="en" long tooltip></TimeAgo>
                    </template>  · 
                    few times read · <router-link :to="`edit/${item.id}`"><i class="fa fa-edit"/></router-link> · <i class="fa fa-trash" @click.prevent="destroyItem(item.id)" style="cursor: pointer"/></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/layouts/Navbar.vue'
import axios from 'axios'
import $ from 'jquery'
import { TimeAgo } from 'vue2-timeago'

export default {
  name: 'Home',
  data() {
    return {
      data: null
    }
  },
  components: {
    Navbar,
    TimeAgo
  },
  mounted() {
    this.getData()
    window.addEventListener('scroll',this.scrollDulu())
  },
  methods: {
    async getData() {
      const data = await axios.get('posting/all')
      let arrayData = Array()
      data.data.data.forEach(element => {
        let toPush = null
        const startDesc = element.description.indexOf('<p class="blog_post_text text-left">')
        if (startDesc < 0) {
          toPush = 'Nothing paragraph in here'  
        } else {
          const jadi_string = $(element.description).text().trim().substr(0, 50)
          toPush = jadi_string
        }
        const data = {
          id: element.id,
          title: element.title,
          description: toPush,
          updated: (element.date_updated != "non") ? true : false,
          updated_date: (element.date_updated != "non") ? element.date_updated : element.date_created
        }
        arrayData.push(data)
      });
      
      this.data = arrayData
    },
    scrollDulu() {
      $(window).bind('scroll', function() {
          if ($(window).scrollTop() >= 53) {
            $('.fixed-top').addClass('fixedin');
          }
          else {
            $('.fixed-top').removeClass('fixedin');
          }
      });
    },
    destroyItem(id) {
      $('button').attr('disabled','disabled')
      $('#app').removeClass('blur')
      axios.delete(`posting/destroy?id=${id}`)
      .then(res => {
        this.$toasted.show(res.data.message, { 
          theme: "outline", 
          position: "top-center", 
          duration : 5000
        });
      })
      .catch(err => {
        this.$toasted.show(err.response.data.data.message, { 
          theme: "outline", 
          position: "top-center", 
          duration : 5000
        });
      })
      .finally(() => {
        $('button').removeAttr('disabled','')
        $('#app').removeClass('blur')
        this.getData()
      })

    }
  }
}
</script>
<style scoped>
@import url('~vue2-timeago/dist/vue2-timeago.css');
h1.carding {
  font-size: 17px;
  font-weight: 700;
}
p {
  color: rgba(117, 117, 117, 1) !important;
  font-size: 16px;
  line-height: 20px;
}

.border-bottom-1 {
  border-bottom: 1px solid rgba(117, 117, 117, 1)
}

.mb-none {
  margin-bottom: 0 !important
}
</style>
