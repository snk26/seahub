(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[21],{1513:function(e,t,n){n(54),e.exports=n(1514)},1514:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(7),o=n(9),i=n(8),c=n(2),s=n.n(c),d=n(24),u=n.n(d),f=n(10),h=n(5),j=n(1),b=n(89),l=n(81),g=n(15),p=n(118),O=n(11),m=n(0),v=window.shared.pageOptions,w=v.repoID,k=v.sharedToken,x=v.rawPath,y=v.err,C=function(e){Object(o.a)(n,e);var t=Object(i.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(m.jsx)(b.a,{content:Object(m.jsx)(R,{})})}}]),n}(s.a.Component),R=function(e){Object(o.a)(n,e);var t=Object(i.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).changeImageURL=function(e){if("image"==e.type){var t=e.data.src;if(!new RegExp(j.fc+"/lib/"+w+"/file.*raw=1").test(t))return;var n=t.substring(j.fc.length),a=n.indexOf("/file"),r=n.indexOf("?");n=n.substring(a+5,r),e.data.src=j.fc+"/view-image-via-share-link/?token="+k+"&path="+h.a.encodePath(n)}return e},r.modifyValueBeforeRender=function(e){return h.a.changeMarkdownNodes(e,r.changeImageURL)},r.state={markdownContent:"",loading:!y},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;f.a.getFileContent(x).then((function(t){e.setState({markdownContent:t.data,loading:!1})})).catch((function(e){var t=h.a.getErrorMsg(e);O.a.danger(t)}))}},{key:"render",value:function(){return y?Object(m.jsx)(l.a,{}):this.state.loading?Object(m.jsx)(g.a,{}):Object(m.jsx)("div",{className:"shared-file-view-body",children:Object(m.jsx)("div",{className:"md-view",children:Object(m.jsx)(p.a,{scriptSource:j.Ob+"js/mathjax/tex-svg.js",markdownContent:this.state.markdownContent,showTOC:!1,serviceURL:j.fc,sharedToken:k,repoID:w,modifyValueBeforeRender:this.modifyValueBeforeRender})})})}}]),n}(s.a.Component);u.a.render(Object(m.jsx)(C,{}),document.getElementById("wrapper"))}},[[1513,1,0]]]);
//# sourceMappingURL=sharedFileViewMarkdown.chunk.js.map