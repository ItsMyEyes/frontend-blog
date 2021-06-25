<template>
    <div>
        <div class="section-featured featured-style-1">
            <div class="container">
                <div class="row">
                    <!--begin featured-->
                    <div class="col-sm-12 col-md-9 col-xl-9">
                        <h2 class="spanborder h4">
                            <span>Random Picks</span>
                        </h2>
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <article class="first mb-3">
                                    <figure><router-link :to="randomPick.url_perma"><img :src="randomPick.thumbail_url" alt="post-title"></router-link></figure>
                                    <h3 class="entry-title mb-3"><router-link :to="randomPick.url_perma">{{ randomPick.title }}</router-link></h3>
                                    <div class="entry-excerpt">
                                        <p>
                                        {{ randomPick.description }}
                                        </p>
                                    </div>
                                    <div class="entry-meta align-items-center">
                                        <a href="#">{{ randomPick.owner }}</a> in <a href="archive.html">Random</a><br>                                  
                                        <span>{{ randomPick.updated_date }}</span>
                                        <span class="middotDivider"></span>
                                        <span class="readingTime" title="3 min read">3 min read</span>
                                        <span class="svgIcon svgIcon--star">
                                            <svg class="svgIcon-use" width="15" height="15">
                                                <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </article>
                                <a class="btn btn-green d-inline-block mb-4 mb-md-0" href="#">Read moore</a>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <article class="post-has-bg" v-for="data in threeRandom" :key="data.index">
                                    <div class="mb-3 d-flex row">
                                        <figure class="col-4 col-md-4"><router-link :to="data.url_perma"><img :src="data.thumbail_url" alt="post-title"></router-link></figure>
                                        <div class="entry-content col-8 col-md-8 pl-md-0">                                                    
                                            <h5 class="entry-title mb-3"><router-link :to="data.url_perma">{{ data.title }}</router-link></h5>
                                            <div class="entry-meta align-items-center">
                                                <a href="#">{{ data.owner }}</a> in <a href="archive.html">random</a><br>
                                                <span>{{ data.updated_date }}</span>
                                                <span class="middotDivider"></span>
                                                <span class="readingTime" title="3 min read">7 min read</span>
                                                <span class="svgIcon svgIcon--star">
                                                    <svg class="svgIcon-use" width="15" height="15">
                                                        <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                            </div>
                        </div>                
                    </div><!--end featured-->                

                    <!--begin Trending-->
                    <div class="col-sm-12 col-md-3 col-xl-3">
                        <div class="sidebar-widget latest-tpl-4">
                            <h4 class="spanborder">
                                <span>Trending</span>
                            </h4>
                            <ol>
                                <li class="d-flex" v-for="(item, index) in fourRandom" :key="index">
                                    <div class="post-count">0{{ index+1 }}</div>
                                    <div class="post-content">
                                        <h5 class="entry-title mb-3"><router-link :to="item.url_perma">{{ item.title }}</router-link></h5>
                                        <div class="entry-meta align-items-center">
                                            <a href="#">{{ item.owner }}</a> in <a href="archive.html">Random</a><br>                                    
                                            <span>{{ item.updated_date }}</span>
                                            <span class="middotDivider"></span>
                                            <span class="readingTime" title="3 min read">7 min read</span>
                                            <span class="svgIcon svgIcon--star">
                                                <svg class="svgIcon-use" width="15" height="15">
                                                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <a class="link-green" href="archive.html">See all trending<svg class="svgIcon-use" width="19" height="19"><path d="M7.6 5.138L12.03 9.5 7.6 13.862l-.554-.554L10.854 9.5 7.046 5.692" fill-rule="evenodd"></path></svg></a>

                    </div> <!--end Trending-->
                </div> <!--end row-->
                <div class="divider"></div>           
            </div> <!--end container-->
        </div>    
    </div>    
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery'

export default {
    data() {
        return {
            randomPick: null,
            threeRandom: null,
            fourRandom : null,
            loading: false
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async randomData(data) {
            const random = Math.floor(Math.random() * data.length)
            this.randomPick = data[random]

            const threeArray = Array()
            for (let i = 0; i < 3; i++) {
                const random = Math.floor(Math.random() * data.length)
                threeArray.push(data[random])
            }
            this.threeRandom = threeArray

            const fourArray = Array()
            for (let i = 0; i <= 3; i++) {
                const random = Math.floor(Math.random() * data.length)
                fourArray.push(data[random])
            }
            this.fourRandom = fourArray
        },
        async getData() {
            this.loading = true
            const data = await axios.get('posting/getAll').finally(() => { this.loading = false })
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
                    updated: (element.date_updated != "non") ? true : false,
                    owner_image: element['ownerPosting.profile_photo'],
                    updated_date: moment((element.date_updated != "non") ? element.date_updated : element.date_created).format("MMM Do YY")
                }
                arrayData.push(data)
            });
            
                this.data = arrayData
                this.randomData(arrayData)
        },
    }
}
</script>
<style scoped>
.post-has-bg {
    background: #fafafa;
    margin-bottom: 2rem;
}
</style>