(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[19],{1560:function(e,t,n){n(54),e.exports=n(1561)},1561:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(7),s=n(9),c=n(8),o=n(2),i=n.n(o),u=n(24),b=n.n(u),d=n(10),j=n(1),f=n(89),p=n(81),O=n(15),h=n(157),l=(n(311),n(0)),v=window.shared.pageOptions,g=v.repoID,m=v.filePath,w=v.err,k=v.commitID,x=v.fileType,y=v.sharedToken,L=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(l.jsx)(f.a,{content:Object(l.jsx)(M,{})})}}]),n}(i.a.Component),M=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).state={isLoading:!w,errorMsg:""},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;if(!w){!function t(){d.a.queryOfficeFileConvertStatus(g,k,m,x.toLowerCase(),y).then((function(n){switch(n.data.status){case"PROCESSING":e.setState({isLoading:!0}),setTimeout(t,2e3);break;case"ERROR":e.setState({isLoading:!1,errorMsg:Object(j.qb)("Document convertion failed.")});break;case"DONE":e.setState({isLoading:!1,errorMsg:""});var a=document.createElement("script");a.type="text/javascript",a.src="".concat(j.Ob,"js/pdf/web/viewer.js"),document.body.append(a)}})).catch((function(t){t.response?e.setState({isLoading:!1,errorMsg:Object(j.qb)("Document convertion failed.")}):e.setState({isLoading:!1,errorMsg:Object(j.qb)("Please check the network.")})}))}()}}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.errorMsg;return w?Object(l.jsx)(p.a,{}):t?Object(l.jsx)(O.a,{}):n?Object(l.jsx)(p.a,{errorMsg:n}):Object(l.jsx)("div",{className:"shared-file-view-body pdf-file-view",children:Object(l.jsx)(h.a,{})})}}]),n}(i.a.Component);b.a.render(Object(l.jsx)(L,{}),document.getElementById("wrapper"))}},[[1560,1,0]]]);
//# sourceMappingURL=sharedFileViewDocument.chunk.js.map