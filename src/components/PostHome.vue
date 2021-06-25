<template>
    <div>
        <hr>
            <div class="container">
                <div class="row">
                <aside class="col-xs-12 col-sm-12 col-md-12 col-4  d-none d-lg-none d-sm-block">
                    <div class="row">
                    <div class="col-12 mb-2"><small><strong>DISCOVER MORE OF WHAT MATTERS TO YOU</strong></small></div>
                    </div>
                    <div class="row">
                    <div class="col">
                    <ul class="list-inline">
                        <li class="list-inline-item btn btn-outline-secondary mb-1" v-for="item in tags" :key="item.undex"> <small> {{ item.title }}</small></li>
                    </ul>
                    <a href="#" class="text-success">See All Topics</a>
                    <hr>
                    </div>
                    </div>
                </aside>
                </div>
            </div>
            <hr>

            <div class="container py-5">
                <div class="row">

                <article class="col-xs-12 col-sm-12 col-md-12 col-lg-8 mt-2">
                    <!-- Article 1 -->
                    <div class="row mb-4" v-for="post in data" :key="post.index" style="cursor: pointer;">
                    <div class="col-12 col-sm-8">
                        <div class="col-12">
                        <small>
                        <img class="rounded-circle" :src="post.owner_image" alt="" style="margin-right: 7px; height: 30px; width: 30px">   
                            {{ post.owner }}
                        <span class="text-muted">in</span>
                        Random
                        </small> <br>
                        <router-link :to="`${post.url_perma}`">
                        <h5 class="font-weight-bold my-2">
                            {{ post.title }}
                        </h5>
                        </router-link>
                        <h6 class="text-muted">{{ post.description }}.</h6>
                        <ul class="list-inline text-muted">
                            <li class="list-inline-item"> <small>May 16</small></li>
                            <li class="list-inline-item"> <small>.</small></li>
                            <li class="list-inline-item"> <small>4 min read</small></li>
                            <li class="list-inline-item small"> <small><i class="fas fa-star"></i></small></li>
                            <li class="list-inline-item float-right">
                                <span class="like-btn" :id="`ac-${post.url_perma}`" @click="like(post.url_perma)" :class="{'like-active': isActive}"></span>
                            </li>
                            </ul>
                    </div>
                    </div>
                    <div class="col-4 thumbail-item">
                        <img class="w-100 border-radius d-none d-sm-block thumbail" :src="post.thumbail_url" alt="">
                    </div>
                    </div>
                </article>


                <!-- Discover More Section - Start -->
                <aside class="col-xs-12 col-sm-12 col-md-12 col-lg-4  d-none d-sm-none d-lg-block">
                <div class="row">
                    <div class="col-12 mb-2"><small><strong>DISCOVER MORE OF WHAT MATTERS TO YOU</strong></small></div>
                </div>
                <div class="row">
                    <div class="col">
                    <ul class="list-inline">
                        <li class="list-inline-item btn btn-outline-secondary mb-1" v-for="item in tags" :key="item.undex"> <small> {{ item.title }} </small> </li>
                    </ul>
                    <a href="#" class="text-success">See All Topics</a>
                    <hr>
                    </div>
                </div>
                </aside>
                <!-- Discover More Section - End -->


                </div>
                
            </div>
    </div>    
</template>
<script>
import axios from 'axios'
import $ from 'jquery'

export default {
    data() {
        return {
            tags: null,
            data: null,
            randomPick: null,
            isActive: false
        }
    },
    mounted() {
        this.getCategory()
        this.getData()
    },
    methods: {
        async getCategory() {
            const data = await axios.get('category/getAll')
            this.tags = data.data.data
        },
        like(oi) {
            $('#ac-' + oi).toggleClass('like-active')
        },
        async getData() {
            const data = await axios.get('posting/getAll')
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
                    thumbail_url: element.thumbail_url,
                    owner: element['ownerPosting.username'],
                    url_perma: element.url_perma,
                    owner_image: element['ownerPosting.profile_photo'],
                    updated: (element.date_updated != "non") ? true : false,
                    updated_date: (element.date_updated != "non") ? element.date_updated : element.date_created
                }
                arrayData.push(data)
            });
            
                this.data = arrayData
            },
    }
}
</script>
<style scoped>
.thumbail {
    object-fit: cover;
    height: 100%;
}
.like-btn {
    display: inline-block;
    Cursor: pointer;
    width: 57px;
    height: 50px;
    position: relative;
    top: -12px;
}

.like-btn {
  background: url('https://i.ibb.co/vw78mf3/heart.png') no-repeat 0% 50%;
  background-size: 2900%;
}


.like-active {
  animation-name: animate;
  animation-duration: .8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.like-active {
  animation-timing-function: steps(28);
}

@keyframes animate {
  0%   { background-position: left;  }
  50%  { background-position: right; }
  100% { background-position: right; }
}
</style>