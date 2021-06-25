exports.outputHtml = (articleObj) => {
    let articleHTML = ''
    if (articleObj[3])
        articleHTML += `<div class="article-post">`
    if (articleObj[articleObj.length]) 
        articleHTML += `</div>`
    articleObj.map(obj => {
         const caption = obj.data.caption ? `<div class="blog_caption">
                        <p>${obj.data.caption}</p>
                    </div>` : ''
        const table = (obj.type == 'table') ? obj.data.content.map(item => {
            const item2 = item.map(item3 => {
                return `<td>${item3}</td>`
            })
            return `<tr>
                ${item2.join('')}
            </tr>`
        }) : ''
        switch (obj.type) {
        case 'paragraph':
            articleHTML += `<p class="blog_post_text text-${obj.tunes.textAlign.alignment}">${obj.data.text}</p>`
            break;
        case 'image':
            articleHTML += `<div class="blog_image mb-5 ${(obj.data.stretched) ? 'stretched' : ''} ${(obj.data.withBackground) ? 'withBackground' : ''} ${(obj.data.withBorder) ? 'withBorder' : ''}">
                        <img src="${obj.data.file.url}" alt="${obj.data.caption}" class="featured-image img-fluid"/>
                        <p class="text-center caption">${caption}</p>
                </div>`
            break;
        case 'image_embed':
            articleHTML += `<div class="blog_image mb-5 ${(obj.data.stretched) ? 'stretched' : ''} ${(obj.data.withBackground) ? 'withBackground' : ''} ${(obj.data.withBorder) ? 'withBorder' : ''}">
                        <img src="${(obj.data.url) ? obj.data.url : obj.data.unsplash}" alt="${obj.data.caption}" class="featured-image img-fluid"/>
                        <p class="text-center caption">${caption}</p>
                </div>`
            break;
        case 'header':
            articleHTML += `<h${obj.data.level} class="blog_post_h${obj.data.level} excerpt text-${obj.tunes.textAlign.alignment}">${obj.data.text}</h${obj.data.level}>`
            break;
        case 'raw':
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
            <div class="ce-code">
                <code>${obj.data.html}</code>
            </div>
            </div>
        </div>\n`;
            break;
        case 'code':
            articleHTML += `<section class="nws3_sec4">
                        <div class="row justify-content-center">
                            <div class="col-12 col-md-10 col-lg-8">
                            <div class="news_code">
                                    <pre>
                                        <code class="html">
                                        ${obj.data.code}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>`
            break;
        case 'list':
            if (obj.data.style === 'unordered') {
                const list = obj.data.items.map(item => {
                    return `<li>${item}</li>`;
                });
                articleHTML += `<ul class="blog_post_ul">
                            ${list.join('')}
                        </ul>`;

            } else {
                    const list = obj.data.items.map(item => {
                        return `<li>${item}</li>`;
                    });
                    articleHTML += `<ul class="blog_post_ul">
                            ${list.join('')}
                        </ul>`           
            }
            break;
        case "quote":
            articleHTML += `<div class="spcl_line mar_b30">
                <blockquote>
                    <p class="spcl_line_p">
                        ${obj.data.text}
                    </p>
                </blockquote>
                <p>- ${obj.data.caption}</p>
            </div>`
            break;
        case 'delimiter':
            articleHTML += `<hr class="section-divider"/>`
            break;
        case 'link':
            articleHTML += `<div class="link-tool">
                    <a class="link-tool__content link-tool__content--rendered" target="_blank" rel="nofollow noindex noreferrer" href="${obj.data.link}">
                        <div class="link-tool__image" style="background-image: url(&quot;${obj.data.meta.image}&quot;);">
                        </div>
                        <div class="link-tool__title">
                            ${obj.data.meta.title}
                        </div>
                        <p class="link-tool__description">
                            ${obj.data.meta.description}
                        </p>
                        <span class="link-tool__anchor">
                            ${obj.data.link}
                        </span>
                    </a>
                </div>`;
            break;
        case 'codeBox': 
            articleHTML += `<div class='card card-code ${obj.data.language}'>
                <div style="
                    color: #828282;
                    font-size: 15px;
                ">//theme langue: ${obj.data.language}</div>
                <pre>${obj.data.code}</pre>
            </div>`
            break;
        case 'table': 
            articleHTML += `<table class='table'>
                ${table.join('')}
            </table>`
            break;
        default:
            return '';
        }
    });
    return articleHTML;
}