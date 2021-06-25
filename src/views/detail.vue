<template>
    <div>
        <div class="fixed-tops">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <router-link class="navbar-brand" to="/"><h1><u>Random</u></h1></router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <router-link active-class="active" class="nav-link" to="/">Our story</router-link>
                            </li>
                            <li class="nav-item active ml-3">
                                <a active-class="active" class="btn btn-green text-green rounded-pill" @click="savedPublish()">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>  

        <main id="content">
            <div class="container">
                <div class="entry-header">                        
                    <div class="mb-5">
                        <h1 class="entry-title m_b_2rem">
                            {{ title }}
                        </h1>
                        <div class="entry-meta align-items-center">
                            <a class="author-avatar rounded" href="#"><img :src="this.avatar" style="rounded" alt=""></a>
                            <a href="author.html">{{ this.username }}</a> in <a href="archive.html">Random</a><br>                                    
                            <span>Jun 17</span>
                            <span class="middotDivider"></span>
                            <span class="readingTime" title="3 min read"><TimeAgo :refresh="60" :datetime="new Date(this.tanggal_upload)" locale="en" long tooltip></TimeAgo></span>
                            <span class="svgIcon svgIcon--star">
                                <svg class="svgIcon-use" width="15" height="15">
                                    <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="entry-wraper"></div>
                <div class="entry-bottom">
                    <div class="tags-wrap heading">
                        <span class="tags">
                            <a  v-for="item in category" :key="item.index" :href="`/category/${item.url_perma}`" :rel="`tag-${item.title}`">{{ item.title }}</a>
                        </span>
                    </div>
                </div>
            </div>
        </main>  
    </div>    
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import { TimeAgo } from 'vue2-timeago'

export default {
    data() {
        return {
            category: null,
            user: null,
            tanggal_upload: null,
            username: null,
            title: null,
            avatar: null
        }
    },
    components: {
        TimeAgo
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData() {
            const data = await axios.get(`posting/detailBlog?url=${this.$route.params.any}`)
            this.category = data.data.dataPost.category_postingan
            this.username = data.data.dataPost.ownerPosting.username
            this.title = data.data.dataPost.title
            this.avatar = data.data.dataPost.ownerPosting.profile_photo
            this.tanggal_upload = (data.data.dataPost.date_updated) ? data.data.dataPost.date_created : data.data.dataPost.date_updated
            $('.entry-wraper').html(data.data.dataPost.description)
        }
    }
}
</script>
<style scoped>
@import url('~vue2-timeago/dist/vue2-timeago.css');
.fixed-tops {
    position: absolute !important;
    border-bottom: 1px solid black;
    top: 0;
    left: 0;
    right: 0;
}

#content {
    max-width: 100%;
    padding-top: 6rem;
}

.entry-wraper, .entry-header, .single-comment, .entry-bottom {
    max-width: 800px;
    margin: 0 auto;
}

.entry-title {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical;
    --x-height-multiplier: 0.342 !important;
    --baseline-multiplier: 0.22 !important;
    transform: translateY(.96px);
    letter-spacing: -.17px !important;
}

h1.entry-title {
    font-weight: 700;
}

.entry-title, .entry-title a:hover {
    color: rgba(0,0,0,.84) !important;
    fill: rgba(0,0,0,.84) !important;
}

h1 {
    font-size: 2.471em;
    line-height: 1.2em;
}

.entry-meta {
    color: rgba(0,0,0,.54) !important;
    fill: rgba(0,0,0,.54) !important;
    font-size: 0.8rem;
    line-height: 1.2;
}

.entry-meta .author-avatar {
    float: left;
    margin: -3px 15px 0 0;
}

.entry-meta .author-avatar img {
    height: 40px;
    width: 40px;
}

a {
    color: rgba(0,0,0,.84);
}

.middotDivider {
    padding-right: 1em;
    font-size: 16px;
    position: relative;
}

.m_b_2rem {
    margin-bottom: 2rem;
}

.featured-image {
    border-radius: 6px !important;
}

.excerpt {
    color: inherit;
    font-weight: 600;
    font-size: 1.345rem;
}

p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-size: 1.25rem;
}

hr.section-divider {
    margin-top: 52px;
    margin-bottom: 42px;
    display: block;
    border: 0;
    text-align: center;
    overflow: visible;
}

hr.section-divider::before {
    --x-height-multiplier: 0.342;
    --baseline-multiplier: 0.22;
    font-family: medium-content-slab-serif-font,Georgia,Cambria,"Times New Roman",Times,serif;
    font-weight: 400;
    font-style: italic;
    font-size: 30px;
    letter-spacing: .6em;
    content: '...';
    display: inline-block;
    margin-left: .6em;
    color: rgba(0,0,0,.68);
    position: relative;
    top: -30px;
}

a:hover, a:active, a:focus, .mobi-menu .current-menu-item a, .mobi-menu.act ul li.open-submenu > a, .widget-about i, .page-404 h1, button.owl-prev:hover i, button.owl-next:hover i, .link-green, .btn-green, .copyright a, .entry-main-content a {
    color: #03a87c !important;
    fill: #03a87c !important;
}

.blog_post_h2, .blog_post_h3, .blog_post_h4, .blog_post_h5, .blog_post_h6 {
    margin: 1.25rem 0 1.875rem 0 !important;
    font-weight: 700 !important;
}

blockquote {
    position: relative;
    border-left: 0;
    padding: 0px 30px;
    font-weight: 400;
    margin-bottom: 1.5rem;
    font-style: italic;
}

blockquote::before {
    content: "";
    top: 0px;
    height: 100%;
    left: 0;
    width: 4px;
    position: absolute;
    background: #000;
}

.tags-wrap {
    margin: 1.5rem 0;
}

.entry-bottom {
    margin-top: 2rem;
    font-size: 1.125em;
}

.tags-wrap a {
    background: rgba(0,0,0,.05);
    border-radius: 3px;
    font-size: 0.875rem;
    padding: 6px 12px;
    margin-right: 3px;
}
</style>