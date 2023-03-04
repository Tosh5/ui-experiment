(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[425],{86010:function(e,n,t){"use strict";function i(e){var n,t,r="";if("string"===typeof e||"number"===typeof e)r+=e;else if("object"===typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=i(e[n]))&&(r&&(r+=" "),r+=t);else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function r(){for(var e,n,t=0,r="";t<arguments.length;)(e=arguments[t++])&&(n=i(e))&&(r&&(r+=" "),r+=n);return r}t.d(n,{Z:function(){return r}})},24058:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var i=t(67294),r=t(9008),a=t.n(r);function c(){return c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},c.apply(this,arguments)}function s(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n.indexOf(t=a[i])>=0||(r[t]=e[t]);return r}var l=["key"],o=["key"],d=(0,i.memo)((function(e){var n,t=e.title,r=e.description,d=e.canonical,u=e.robots,h=e.maxDescriptionCharacters,m=void 0===h?150:h,p=e.twitter,_=void 0===p?{}:p,j=e.og,x=void 0===j?{}:j,f=e.customMetaTags,v=void 0===f?[]:f,g=e.customLinkTags,y=void 0===g?[]:g,w=[];return t&&w.push(i.createElement("title",{key:"title"},t)),u&&w.push(i.createElement("meta",{key:"robots",name:"robots",content:u})),r&&w.push(i.createElement("meta",{key:"description",name:"description",content:r.substr(0,m)})),d&&w.push(i.createElement("link",{key:"canonical",rel:"canonical",href:d})),_.card&&w.push(i.createElement("meta",{key:"twitter:card",name:"twitter:card",content:_.card})),_.site&&w.push(i.createElement("meta",{key:"twitter:site",name:"twitter:site",content:_.site})),(x.url||d)&&w.push(i.createElement("meta",{key:"og:url",property:"og:url",content:x.url||d})),(x.title||t)&&w.push(i.createElement("meta",{key:"og:title",property:"og:title",content:x.title||t})),x.image&&w.push(i.createElement("meta",{key:"og:image",property:"og:image",content:x.image})),(x.description||r)&&w.push(i.createElement("meta",{key:"og:description",property:"og:description",content:null==(n=x.description||r)?void 0:n.substr(0,m)})),x.type&&w.push(i.createElement("meta",{key:"og:type",property:"og:type",content:x.type})),x.siteName&&w.push(i.createElement("meta",{key:"og:site_name",property:"og:site_name",content:x.siteName})),v.length>0&&w.push(v.map((function(e,n){var t=e.key,r=s(e,l);return i.createElement("meta",c({key:"meta-"+(t||n)},r))}))),y.length>0&&w.push(y.map((function(e,n){var t=e.key,r=s(e,o);return i.createElement("link",c({key:"link-"+(t||n)},r))}))),i.createElement(a(),null,w)}))},39356:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tech-or-idea",function(){return t(74403)}])},49026:function(e,n,t){"use strict";t.d(n,{G:function(){return o}});var i=t(85893),r=t(41664),a=t.n(r),c=t(86010),s=t(25992),l=t.n(s),o=function(e){var n=e.title,t=e.children,r=e.isContentStyle,s=e.childTabItems,o=void 0===s?[]:s;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("header",{className:l().header,children:(0,i.jsxs)("div",{className:l().wrapper,children:[(0,i.jsx)("h1",{className:l().title,style:{letterSpacing:n.length<6?"0.1em":"0"},children:n}),o.length>0&&(0,i.jsx)("div",{className:l().childTab,children:o.map((function(e,n){return(0,i.jsx)(a(),{href:e.href,passHref:!0,children:(0,i.jsx)("a",{className:l().childTabItem,"aria-current":e.isActive?"page":void 0,children:e.displayName})},"tab-".concat(n))}))})]})}),(0,i.jsx)("div",{className:l().wrapper,children:(0,i.jsx)("div",{className:(0,c.Z)(l().content,{znc:r}),children:t})})]})}},26075:function(e,n,t){"use strict";t.d(n,{I:function(){return m}});var i=t(85893),r=t(9008),a=t.n(r),c=t(67294),s=t(24058),l=t(67920),o=t(77442),d=t(83454),u="https://zenn.dev",h=!!d.env.NEXT_PUBLIC_NOINDEX_ALL,m=(0,c.memo)((function(e){var n=e.path,t=e.title,r=e.canonicalPath,c=e.description,d=e.ogImageUrl,m=e.noindex,p=e.disableTitleTemplate,_=e.feedTitle,j=e.feedPath,x=e.zennCardImageUrl,f=e.zennCardDescription,v=e.hatenaId,g=e.twitterCard,y=void 0===g?"summary":g,w=void 0!==n?"".concat(u).concat(n):void 0;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.Z,{title:t?p?t:"".concat(t," | Zenn"):void 0,canonical:r&&w?w:void 0,maxDescriptionCharacters:140,description:c,robots:h||m?"noindex, nofollow":void 0,og:{title:t||"Zenn | \u30a8\u30f3\u30b8\u30cb\u30a2\u306e\u305f\u3081\u306e\u60c5\u5831\u5171\u6709\u30b3\u30df\u30e5\u30cb\u30c6\u30a3",description:c,url:w,image:d||(0,o.R)("/logo-only-dark.png"),type:"article",siteName:"Zenn"},twitter:{card:y}}),(0,i.jsxs)(a(),{children:[!(!j||!_)&&(0,i.jsx)("link",{rel:"alternate",type:"application/rss+xml",title:_,href:u+j}),!!x&&(0,i.jsx)("meta",{name:"zenn:image",content:x}),!!f&&(0,i.jsx)("meta",{name:"zenn:description",content:f}),!!v&&l.xB.test(v)&&(0,i.jsx)("link",{rel:"author",href:"http://www.hatena.ne.jp/".concat(v,"/")})]})]})}))},70022:function(e,n,t){"use strict";t.d(n,{d:function(){return s}});var i=t(85893),r=t(67294),a=t(46370),c=t.n(a);var s=(0,r.memo)((function(e){var n,t=e.text,r=e.style;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:c().twemoji,style:r,children:(0,i.jsx)("span",{className:c().twemojiImg,style:{backgroundImage:"url(".concat((n=t,"".concat("https://asia-northeast1-zenn-dev-production.cloudfunctions.net","/twemoji/").concat(n,".svg")),")")}})}),(0,i.jsx)("span",{className:c().nativeEmoji,style:r,children:t})]})}))},97146:function(e,n,t){"use strict";t.d(n,{y:function(){return h}});var i=t(85893),r=t(41664),a=t.n(r),c=t(11163),s=t(47750),l=t.n(s),o=t(20901),d=t(70022),u=[{href:"/about",emoji:"\ud83d\udd0d",label:"Zenn\u3068\u306f"},{href:"/tech-or-idea",emoji:"\ud83d\uddc3",label:"Tech\u3068Idea"},{href:"/guideline",emoji:"\ud83c\udf0f",label:"\u30ac\u30a4\u30c9\u30e9\u30a4\u30f3"},{href:"/faq",emoji:"\ud83d\udca1",label:"Q & A"},{href:"/terms",emoji:"\ud83d\udcd1",label:"\u5229\u7528\u898f\u7d04"},{href:"/privacy",emoji:"\ud83d\udd12",label:"\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc"},{href:"/mediakit",emoji:"\ud83d\udcf8",label:"\u30e1\u30c7\u30a3\u30a2\u30ad\u30c3\u30c8"}],h=function(e){var n=e.children,t=(0,c.useRouter)().pathname;return(0,i.jsx)("div",{id:"top",children:(0,i.jsxs)("div",{className:l().container,children:[(0,i.jsx)("header",{className:l().header,children:(0,i.jsx)(o.W,{children:(0,i.jsx)("nav",{className:l().navs,children:u.map((function(e,n){return(0,i.jsx)(a(),{href:e.href,passHref:!0,children:(0,i.jsxs)("a",{className:t.includes(e.href)?l().navActive:l().nav,children:[(0,i.jsx)("div",{className:l().navEmoji,children:(0,i.jsx)(d.d,{text:e.emoji})}),(0,i.jsx)("div",{className:l().navName,children:e.label})]})},"spn-".concat(n))}))})})}),(0,i.jsx)(o.W,{children:(0,i.jsx)("div",{className:l().inner,children:(0,i.jsx)("article",{className:l().articleContainer,children:n})})})]})})}},74403:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return h}});var i=t(85893),r=t(11140),a=t.n(r),c=t(49026),s=t(77442),l=function(){return(0,i.jsxs)(c.G,{title:"\u6295\u7a3f\u30ab\u30c6\u30b4\u30ea\u30fc\u306e\u9078\u3073\u65b9",isContentStyle:!1,children:[(0,i.jsxs)("p",{children:["Zenn\u3067\u306f\u8a18\u4e8b\u3092\u6295\u7a3f\u3059\u308b\u3068\u304d\u306b",(0,i.jsx)("strong",{children:"Tech"}),"\uff08\u6280\u8853\u8a18\u4e8b\uff09 \u304b",(0,i.jsx)("strong",{children:"Idea"}),"\uff08\u30a2\u30a4\u30c7\u30a2\u8a18\u4e8b\uff09 \u306e\u3069\u3061\u3089\u304b\u306e\u30ab\u30c6\u30b4\u30ea\u30fc\u3092\u9078\u3073\u307e\u3059\u3002 \u3053\u308c\u306f\u8aad\u8005\u304c\u60c5\u5831\u53ce\u96c6\u3092\u3057\u3084\u3059\u304f\u3059\u308b\u305f\u3081\u306e\u4ed5\u7d44\u307f\u3067\u3059\u3002"]}),(0,i.jsxs)("div",{className:a().categoriesContainer,children:[(0,i.jsxs)("section",{className:a().column,children:[(0,i.jsxs)("header",{className:a().header,children:[(0,i.jsx)("img",{src:(0,s.R)("/drawing/tech.svg"),alt:"\u6280\u8853",width:80,height:67}),(0,i.jsx)("h2",{className:a().title,children:"Tech"})]}),(0,i.jsx)("p",{className:a().description,children:"\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u3084\u30bd\u30d5\u30c8\u30d5\u30a7\u30a2\u3001\u30cf\u30fc\u30c9\u30a6\u30a7\u30a2\u3001\u30a4\u30f3\u30d5\u30e9\u306a\u3069\u306e\u6280\u8853\u306b\u95a2\u3059\u308b\u8a18\u4e8b\u306a\u3089Tech\u3092\u9078\u3073\u307e\u3059\u3002"}),(0,i.jsxs)("ul",{className:a().examples,children:[(0,i.jsx)("li",{children:"\u4f8b\uff09Swift\u306e\u25cb\u25cb\u3067\u3064\u307e\u305a\u3044\u305f\u3068\u304d\u306e\u5bfe\u51e6\u6cd5"}),(0,i.jsx)("li",{children:"\u4f8b\uff09GitHub Actions\u3067\u81ea\u52d5\u30c7\u30d7\u30ed\u30a4"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u30e9\u30ba\u30d1\u30a4\u3067IoT"}),(0,i.jsx)("li",{children:"\u4f8b\uff09AWS IAM\u30dd\u30ea\u30b7\u30fc\u306e\u8a2d\u5b9a\u65b9\u6cd5"}),(0,i.jsx)("li",{children:"\u4f8b\uff09Docker\u306e\u4f7f\u3044\u65b9"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u6570\u5b66\u4ee3\u6570\u5165\u9580"}),(0,i.jsx)("li",{children:"\u4f8b\uff09React\u3068Vue\u306e\u30d1\u30d5\u30a9\u30fc\u30de\u30f3\u30b9\u6bd4\u8f03\u691c\u8a3c"})]})]}),(0,i.jsxs)("section",{className:a().columnIdea,children:[(0,i.jsxs)("header",{className:a().header,children:[(0,i.jsx)("img",{src:(0,s.R)("/drawing/idea.svg"),alt:"\u30a2\u30a4\u30c7\u30a2",width:80,height:67}),(0,i.jsx)("h2",{className:a().title,children:"Idea"})]}),(0,i.jsx)("p",{className:a().description,children:"\u30ad\u30e3\u30ea\u30a2\u3084\u30de\u30cd\u30b8\u30e1\u30f3\u30c8\u306a\u3069\u6280\u8853\u306b\u76f4\u63a5\u95a2\u4fc2\u3057\u306a\u3044\u30c8\u30d4\u30c3\u30af\u3084\u3001\u30ea\u30f3\u30af\u3092\u4e26\u3079\u305f\u307e\u3068\u3081\u8a18\u4e8b\u306a\u3069\u306b\u306fIdea\u3092\u9078\u3073\u307e\u3059\u3002"}),(0,i.jsxs)("ul",{className:a().examples,children:[(0,i.jsx)("li",{children:"\u4f8b\uff09\u65b0\u4eba\u6559\u80b2\u3067\u6c17\u3092\u3064\u3051\u3066\u3044\u308b\u3053\u3068"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u30de\u30cd\u30b8\u30e1\u30f3\u30c8\u3067\u6c17\u3092\u3064\u3051\u3066\u3044\u308b\u3053\u3068"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u304a\u3059\u3059\u3081\u306e\u6280\u8853\u66f8/\u8a18\u4e8b"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u958b\u767a\u3092\u52b9\u7387\u5316\u3059\u308b\u304a\u3059\u3059\u3081\u30c4\u30fc\u30eb\u96c6"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u30a8\u30f3\u30b8\u30cb\u30a2\u306e\u30ad\u30e3\u30ea\u30a2\u30d1\u30b9"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u30d7\u30ed\u30b0\u30e9\u30de\u30fc\u306e\u305f\u3081\u306e\u30c7\u30b6\u30a4\u30f3\u306e\u57fa\u672c"}),(0,i.jsx)("li",{children:"\u4f8b\uff09\u8cc7\u683c\u8a66\u9a13\u306e\u53d7\u9a13\u8a18\u30fb\u52c9\u5f37\u65b9\u6cd5"})]})]})]}),(0,i.jsx)("br",{}),(0,i.jsx)("p",{className:a().note,children:"\u5224\u65ad\u304c\u3080\u305a\u304b\u3057\u3044\u5834\u5408\u306f\u3069\u3061\u3089\u3092\u9078\u3093\u3067\u3082\u69cb\u3044\u307e\u305b\u3093\u3002\u305f\u3060\u3057\u3001\u904b\u55b6\u5074\u3067\u901a\u77e5\u306a\u304f\u5909\u66f4\u3092\u884c\u3046\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\uff08\u81ea\u52d5\u3067\u5909\u66f4\u304c\u884c\u308f\u308c\u308b\u3053\u3068\u3082\u3042\u308a\u307e\u3059\u3002\u304a\u304b\u3057\u3051\u308c\u3070\u3054\u5831\u544a\u304f\u3060\u3055\u3044\uff09"})]})},o=t(26075),d=t(97146),u=function(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l,{}),(0,i.jsx)(o.I,{title:"\u6295\u7a3f\u30ab\u30c6\u30b4\u30ea\u30fc\u300cTech\u300d\u300cIdea\u300d\u306e\u9078\u3073\u65b9",path:"/tech-or-idea",canonicalPath:!0})]})};u.layout=d.y;var h=u},67920:function(e,n,t){"use strict";t.d(n,{Bq:function(){return c},PE:function(){return s},QI:function(){return l},Q_:function(){return d},VX:function(){return i},Z:function(){return o},aX:function(){return a},xB:function(){return r}});var i=/^[0-9a-z_]*$/,r=/^[a-zA-Z][a-zA-Z0-9_-]{1,30}[a-zA-Z0-9]$/,a=/^[\u30a2-\u30f3\uff21-\uff3a\uff10-\uff19\u30fc\uff08\uff09\uff0f\uff0e\u30fc\u3000]*$/,c=/^(UA|G)-[0-9a-zA-Z-]{3,20}$/,s=/[ -/:-@[-`{-~]/g,l=/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,o=/^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/i,d=/^[a-z0-9_]{1,15}$/},25992:function(e){e.exports={wrapper:"GuideContainer_wrapper__0Zlpw",header:"GuideContainer_header___z8tH",title:"GuideContainer_title__dAwwE",childTab:"GuideContainer_childTab__e0_HQ",childTabItem:"GuideContainer_childTabItem__taPHm",content:"GuideContainer_content__KSV5V"}},46370:function(e){e.exports={twemoji:"Emoji_twemoji__mFta9",twemojiImg:"Emoji_twemojiImg__Imjtw",nativeEmoji:"Emoji_nativeEmoji__JRjFi"}},47750:function(e){e.exports={container:"guide_container__0ikVH",header:"guide_header__BX2Ky",navs:"guide_navs__8Fthv",nav:"guide_nav__moUzi",navEmoji:"guide_navEmoji__wbF17",navName:"guide_navName__9fW6C",navActive:"guide_navActive__91QlI guide_nav__moUzi",articleContainer:"guide_articleContainer__o71Cp",inner:"guide_inner__Yl4KY"}},11140:function(e){e.exports={column:"View_column__kIJhk",columnIdea:"View_columnIdea__xQCCx View_column__kIJhk",header:"View_header__yq_I6",categoriesContainer:"View_categoriesContainer__Rgj8S",title:"View_title__ntIp5",description:"View_description__drLdi",examples:"View_examples__2Mh3G",note:"View_note__8J7LJ"}},11163:function(e,n,t){e.exports=t(90387)}},function(e){e.O(0,[9774,2888,179],(function(){return n=39356,e(e.s=n);var n}));var n=e.O();_N_E=n}]);