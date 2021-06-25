<template>
  <div >
    <template v-if="!publish">
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
                                <router-link active-class="active" class="nav-link" to="/coming-soon-mobile">Save draft</router-link>
                            </li>
                            <li class="nav-item active ml-3">
                                <a active-class="active" class="btn btn-green text-green rounded-pill" @click="savedPublish()">Publish</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div class="container" style="margin-top: 9%;">
            <input type="text" placeholder="Title..." v-model="form.title"  id="" class="form-control title mb-2" />
            <div id="aku"></div>
        </div>
    </template>
    <template v-else>
        <div class="container overlay-dialog">
            <div class="overlay-content">
                <button @click="close()" class="button button--close button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon" data-action="cancel" aria-label="Close">
                    <span class="svgIcon svgIcon--removeThin svgIcon--29px"><svg class="svgIcon-use" width="29" height="29"><path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fill-rule="evenodd"></path></svg></span>
                </button>
                <div class="row ">
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <p class="ui-body u-textColorDarkest u-marginBottom10"><b>Story Preview</b></p>
                        <input type="text" class="form-control mb-3" v-model="form.title" placeholder="Some title...">
                        <div class="image-preview u-height100 mb-5 u-relative">
                            <button @click="$refs.fileInput.click()" class="button button--primary button--withChrome u-accentColor--buttonNormal u-absolute u-top42pct u-left32Percent u-transformXYNegative50pct u-borderColorTransparentWhiteDark u-textColorWhite u-backgroundTransparentBlackDark" data-action="show-image-selection">
                                <template v-if="loading">
                                    <i class="fa fa-refresh fa-spin" style="font-size:20px"></i> Uploading...
                                </template>
                                <template v-else>
                                    Change Preview Image
                                </template>
                            </button>
                            <input style="display: none" ref="fileInput" type="file" @change="fileSelected" enctype="multipart/form-data" accept="image/*">
                            <input style="display: none" type="text" v-model="form.thumbail_url">
                            <img :src="dataBackground" alt="" srcset="" class="w-100 shadow" style="object-fit: cover;object-position: center;height: 200px;border-radius: 4px">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <p class="ui-body u-marginBottom10 u-textColorDarkest publish">Publishing to: <b>{{ this.$store.state.user.user.username }}</b></p>
                        <p class="ui-caption u-marginBottom10"><span class="u-textColorDarkest">Add or change tags (up to 5) so readers know what your story is about</span></p>
                        <div class='tag-input'>
                            <div v-for='(tag,index) in tags' :key='index' class='tag-input__tag'>
                            <span @click='removeTag(index)'>x</span>
                            {{ tag.title }}
                            </div>
                            <input 
                                type='text' 
                                placeholder="Enter a Tag" 
                                class='tag-input__text' 
                                @keydown.enter='addTag' 
                                @keydown.188='addTag'
                                @keydown.delete='removeLastTag'
                                @keyup="onInputChange"
                                @keydown="onSelectData" 
                                @keydown.tab.prevent="complete()"
                                :value="input"
                            />
                            <template v-if="input.length > 0">
                                <div class="row">
                                    <div v-show="filteredData.length"
                                        class="col-12 filtered-data"
                                        :class="{active: searchIndex === i}"
                                        v-for="(person, i) in filteredData"
                                        :key="person.id"
                                        @click="complete(i)"
                                    >
                                        <p>{{ person.title }} <b>({{ person.categoryPost.length }})</b></p>
                                    </div>
                                    <div class="col-12 filtered-data active" @click="registCategory" v-show="filteredData.length < 1">
                                        <p> + Create new category</p>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="u-marginTop24">In order to make your story eligible to earn as part of Medium’s metered paywall, join the <a class="link link--underline u-baseColor--link" href="https://medium.com/earn">Partner Program.</a></div>
                        <div class="u-marginTop24"><a class="link link--underline u-baseColor--link" href="https://help.medium.com/hc/en-us/articles/360018677974" target="_blank">Learn more</a> about what happens to your post when you publish.</div>
                        <div class="u-marginTop24">
                            <div class="row col-10">
                                <button class="_3cSYLCdfQuq6NFBFdSRaTc _16sebnLLvEN4lKQ4WuitZc ListView-actionCreate col-5 text-center" href="#" @click="save()">Publish postingan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import inlineCode from '@editorjs/inline-code'
import embed from '@editorjs/embed'
import quote from '@editorjs/quote'
import marker from '@editorjs/marker'
import link from '@editorjs/link'
import delimiter from '@editorjs/delimiter'
import table from '@editorjs/table'
import CodeBox from '@bomdi/codebox'
import AligmentTool from 'editorjs-text-alignment-blocktune'
import paragraph from '@editorjs/paragraph'
import axios from 'axios'
import InlineImage from 'editorjs-inline-image';
import html from '../assets/jsonToHtml'
import $ from 'jquery'

export default {
    data() {
        return {
            publish: false,
            dataJson: null,
            dataBackground: null,
            tags: [],
            tagJson: [],
            search: null,
            input: '',
            filteredData: [],
            searchIndex: 0,
            data: null,
            loading: false,
            articleHTML: null,
            form: {
                title: null,
                description: null,
                thumbail_url: null
            }
        }
    },
    async mounted() {
        this.loadEditor()
        this.getCategory()
    },
    methods: {
        async getCategory() {
            const category = await axios.get('category/getAll')
            this.data = category.data
        },
        async save() {
            if (this.tags.length < 1) 
                return this.$toasted.show('Please add some tag :(', { 
                    theme: "outline", 
                    position: "top-center", 
                    duration : 5000
                });

            if (!this.form.title) 
                return this.$toasted.show('Please add some title :(', { 
                    theme: "outline", 
                    position: "top-center", 
                    duration : 5000
                });
            
            
            const ini = html.outputHtml(this.dataJson.blocks)

            if (!ini) {
                this.publish = false;
                this.loadEditor()
                return this.$toasted.show('Cant save beacause in story nothing :(', { 
                    theme: "outline", 
                    position: "top-center", 
                    duration : 5000
                });
            }
            const data = {
                title: this.form.title,
                description: ini,
                thumbail_url: this.form.thumbail_url,
                json: this.dataJson
            }
            $("input[type=button]").attr("disabled", "disabled");
            $("button").attr("disabled", "disabled");
            $('#app').addClass('blur')
            axios.post('posting/create',data)
            .then(data => {
                const category = {
                    post_id: data.data.data.id,
                    category_id: this.tagJson.toString()
                }
                axios.post('posting/category/create',category)
                .finally(() => {
                    $("input[type=button]").removeAttr("disabled", "disabled");
                    $("button").removeAttr("disabled", "disabled");
                    $('#app').removeClass('blur')
                    this.$router.push('/me/write')
                })
            })
            return;
        },
        fileSelected(e) {
            e.preventDefault()
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file)
            this.loading = true
            axios.post('posting/uploads', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.form.thumbail_url = res.data.file.url
            }).catch(err => {
                console.log(err.response.message)
            }).finally(() => {
                this.loading = false
            })
            this.dataBackground = URL.createObjectURL(file)
        },
        async registCategory() {
            const data = await axios.post('category/create',{ title: this.input }).then((data) => { return data }).catch(err => { return err })
            console.log(data)
            const array = {
                id: data.data.data.id,
                title: data.data.data.title,
            }
            this.getCategory()
            this.tags.push(array)
            this.tagJson.push(data.data.data.id)
            this.input = ''
        },
        async complete(i) {
            if (!this.filteredData[i]) return this.registCategory();
            const filter = this.tags.filter(filter =>  (filter.id == this.filteredData[i].id) ? true : false);
            if (filter.length > 0) return;
            const array = {
                id: this.filteredData[i].id,
                title: this.filteredData[i].title,
            }
            this.tags.push(array)
            this.tagJson.push(this.filteredData[i].id)
            this.filteredData = [];
            this.input = ''
        },
        async addTag (event) {
            event.preventDefault()
            var val = event.target.value.trim()
            const filter = this.filteredData.filter(filter =>  (filter.title == val) ? true : false);
            if (val.length > 0 && !filter) {
                this.tags.push(val)
                this.input = ''
                this.filteredData = [];
            }
        },
        removeLastTag(event) {
            if (event.target.value.length === 0) {
                this.removeTag(this.tags.length - 1)
            }
        },
        removeTag (index) {
            this.tags.splice(index, 1)
        },
        async onInputChange(e) {
            const isEnterKey = e.keyCode === 13;
            const isArrowDownKey = e.keyCode === 40;
            const isArrowUpKey = e.keyCode === 38;
            const isTabKey = e.keyCode === 9;
            
            if(isEnterKey || isArrowDownKey || isArrowUpKey || isTabKey) {
                return;
            }
            const search = e.target.value.toLowerCase();
            this.input = e.target.value;
            this.searchIndex = 0;
            if(this.input.length) {
                this.filteredData = this.data.data.filter((person) => person.title.toLowerCase().startsWith(search));
            } else {
                this.filteredData = [];
            }
        },
        onSelectData(e) {
            const isArrowDownKey = e.keyCode === 40;
            const isArrowUpKey = e.keyCode === 38;
            const isEnterKey = e.keyCode === 13;

            if(isArrowDownKey && this.searchIndex < this.filteredData.length - 1) {
                this.searchIndex++;
            } else if(isArrowUpKey && this.searchIndex > 0) {
                this.searchIndex--;
            } else if(isEnterKey) {
                this.complete(this.searchIndex);
            }
        },
        async savedPublish() {
            this.dataJson = await window.editor.save()
            const image = this.dataJson.blocks.filter(type => { return ( type.type == 'image' ) ? type : '' })
            this.dataBackground = (image.length > 0) ? image[0].data.file.url : "https://i.pinimg.com/736x/6e/07/84/6e0784191f379d0c9b641719bd45a247.jpg"
            this.form.thumbail_url = this.dataBackground 
            this.publish = true
            console.log(this.dataJson)
        },
        close() {
            this.publish = false
            this.loadEditor()
        },
        loadEditor() {
            window.editor = new EditorJS({
                autofocus: true,
                holder: 'aku',
                placeholder: 'Write Your Stories...',
                data: this.dataJson,
                tools: {
                    embed: {
                        class: embed,
                        config: {
                            services: {
                                youtube: true,
                                coub: true,
                                imgur: true
                            }
                        }
                    },
                    header: {
                        class: Header,
                        config: {
                            placeholder: 'Enter a header'
                        },
                        tunes: ['textAlign']
                    },
                    list: {
                        class: List,
                        inlineToolbar: true
                    },
                    paragraph: {
                        class: paragraph,
                        tunes: ['textAlign']
                    },
                    inlineCode: {
                        class: inlineCode,
                    },
                    codeBox: {
                        class: CodeBox,
                        config: {
                            themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
                            themeName: 'atom-one-dark', // Optional
                            useDefaultTheme: 'light' // Optional. This also determines the background color of the language select drop-down
                        }
                    },
                    link: {
                        class: link, 
                        config: {
                            endpoint: 'http://localhost:8000/scrap/browser', // Your backend endpoint for url data fetching
                        }
                    },
                    marker: {
                        class: marker,
                    },
                    table: {
                        class: table,
                    },
                    delimiter: {
                        class: delimiter,
                    },
                    quote: {
                        class: quote,
                    },
                    image_embed: {
                        class: InlineImage,
                        inlineToolbar: true,
                        config: {
                            embed: {
                                display: true,
                            },
                            unsplash: {
                                appName: 'blog',
                                clientId: 'TouCyIWsVRMX0LKHBsKlA0lZpUNT_2WRa1wxTwGHAxY'
                            }
                        }
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: 'http://localhost:8000/posting/uploads', // Your backend file uploader endpoint
                            },
                            additionalRequestHeaders: {
                                'Authorization': 'Auth '+localStorage.getItem('sesSuccess')
                            },
                            type: "image/*",
                        },
                    },
                    textAlign: {
                        class:AligmentTool,
                        config:{
                            default: "left",
                            blocks: {
                                header: 'left',
                                list: 'left'
                            }
                        },
                    }
                },

            });
        }
    },
}
</script>

<style>
@import url('../assets/publish.css');
.fixed-tops {
    position: absolute !important;
    border-bottom: 1px solid black;
    top: 0;
    left: 0;
    right: 0;
}
.ce-paragraph {
    font-size: 21px !important;
}

.icon.icon--plus {
    border: 1px solid #000;
    border-radius: 50%;
    padding: 8px;
    width: 35px !important;
    height: 35px !important;
    margin-left: -22px;
}
.ce-block__content {
    max-width: 900px !important;
}

.ce-toolbar__plus {
    left: -160px;
}

.ce-toolbar .ce-toolbox {
    left: -129px;
}

.ce-toolbar__actions {
    right: -168px;
}
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
.filtered-data {
    background: #fefe;
    border: 1px solid #fefe;
    padding: 12px 20px 13px;
    cursor: pointer;
}

.filtered-data p {
    margin-bottom: 0 !important;
    font-size: 14px;
    font-weight: bold
}

.filtered-data.active {
    background-color: #77DD77;
}
.title {
    margin: 0 auto;
    width: 83.9%;
    font-size: 33px;
    font-weight: bold;
    border: 0;
}
.title:focus {
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    border-left: 1px solid #b3b3b1;
}

.js-titleLabel {
    transform: translate3d(0px, 0px, 0px);
    position: absolute;
    top: 32%;
    left: 16%;
    color: #6c757d;
    display: block;
}
</style>