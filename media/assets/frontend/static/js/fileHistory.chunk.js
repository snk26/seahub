(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[6],{1478:function(e,t,n){n(54),e.exports=n(1699)},1699:function(e,t,n){"use strict";n.r(t);var a=n(6),i=n(7),r=n(9),s=n(8),o=n(2),c=n.n(o),d=n(24),l=n.n(d),h=n(60),f=n.n(h),u=n(1),p=n(5),m=n(51),v=n(71),b=n(103),j=n(15),g=n(13),O=n.n(g),y=n(4),x=n(99),I=n(0);O.a.locale(window.app.config.lang);var k=function(e){Object(r.a)(n,e);var t=Object(s.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).onMouseEnter=function(){i.props.isItemFreezed||i.setState({isShowOperationIcon:!0})},i.onMouseLeave=function(){i.props.isItemFreezed||i.setState({isShowOperationIcon:!1})},i.onToggleClick=function(e){i.setState({isMenuShow:!i.state.isMenuShow}),i.props.onFreezedItemToggle()},i.onItemClick=function(){if(i.setState({isShowOperationIcon:!1}),i.props.item.commit_id!==i.props.currentItem.commit_id){var e=i.props.index;i.props.onItemClick(i.props.item,e)}},i.onItemRestore=function(){i.props.onItemRestore(i.props.currentItem)},i.onItemDownload=function(){},i.state={isShowOperationIcon:!1,isMenuShow:!1},i}return Object(i.a)(n,[{key:"render",value:function(){if(!this.props.currentItem)return"";var e=this.props.item,t=O()(e.ctime).format("YYYY-MM-DD HH:mm"),n=!1;this.props.item&&this.props.currentItem&&(n=this.props.item.commit_id===this.props.currentItem.commit_id);var a=this.props.currentItem.rev_file_id,i=x.a.getUrl({type:"download_historic_file",filePath:u.mb,objID:a});return Object(I.jsxs)("li",{className:"history-list-item ".concat(n?"item-active":""),onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,onClick:this.onItemClick,children:[Object(I.jsxs)("div",{className:"history-info",children:[Object(I.jsx)("div",{className:"time",children:t}),Object(I.jsxs)("div",{className:"owner",children:[Object(I.jsx)("span",{className:"squire-icon"}),Object(I.jsx)("span",{children:e.creator_name})]})]}),Object(I.jsx)("div",{className:"history-operation",children:Object(I.jsxs)(y.l,{isOpen:this.state.isMenuShow,toggle:this.onToggleClick,children:[Object(I.jsx)(y.o,{tag:"a",className:"fas fa-ellipsis-v ".concat(this.state.isShowOperationIcon||n?"":"invisible"),"data-toggle":"dropdown","aria-expanded":this.state.isMenuShow,alt:Object(u.qb)("More Operations")}),Object(I.jsxs)(y.n,{children:[0!==this.props.index&&Object(I.jsx)(y.m,{onClick:this.onItemRestore,children:Object(u.qb)("Restore")}),Object(I.jsx)(y.m,{tag:"a",href:i,onClick:this.onItemDownLoad,children:Object(u.qb)("Download")})]})]})})]})}}]),n}(c.a.Component),w=function(e){Object(r.a)(n,e);var t=Object(s.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).componentDidMount=function(){var e=i.props.historyList;e.length>0&&(i.setState({currentItem:e[0]}),1===e?i.props.onItemClick(e[0]):i.props.onItemClick(e[0],e[1]))},i.onFreezedItemToggle=function(){i.setState({isItemFreezed:!i.state.isItemFreezed})},i.onScrollHandler=function(e){var t=e.target.clientHeight,n=e.target.scrollHeight,a=t+e.target.scrollTop+1>=n,r=i.props.hasMore;a&&r&&i.props.reloadMore()},i.onItemClick=function(e,t){if(i.setState({currentItem:e}),t!==i.props.historyList.length){var n=i.props.historyList[t+1];i.props.onItemClick(e,n)}else i.props.onItemClick(e)},i.state={isItemFreezed:!1,currentItem:null},i}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return Object(I.jsxs)("ul",{className:"history-list-container",onScroll:this.onScrollHandler,children:[this.props.historyList.map((function(t,n){return Object(I.jsx)(k,{item:t,index:n,currentItem:e.state.currentItem,isItemFreezed:e.state.isItemFreezed,onItemClick:e.onItemClick,onItemRestore:e.props.onItemRestore,onFreezedItemToggle:e.onFreezedItemToggle},n)})),this.props.isReloadingData&&Object(I.jsx)("li",{children:Object(I.jsx)(j.a,{})})]})}}]),n}(c.a.Component),C=n(11),D=function(e){Object(r.a)(n,e);var t=Object(s.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).reloadMore=function(){if(!i.state.isReloadingData){var e=i.state.currentPage+1;i.setState({currentPage:e,isReloadingData:!0}),b.a.listFileHistoryRecords(u.mb,e,u.a).then((function(e){i.updateResultState(e.data),i.setState({isReloadingData:!1})}))}},i.onItemRestore=function(e){var t=e.commit_id;b.a.revertFile(u.mb,t).then((function(e){e.data.success&&(i.setState({isLoading:!0}),i.refershFileList());var t=Object(u.qb)("Successfully restored.");C.a.success(t)}))},i.onItemClick=function(e,t){i.props.onItemClick(e,t)},i.state={historyInfo:"",currentPage:1,hasMore:!1,isLoading:!0,isError:!1,fileOwner:"",isReloadingData:!1},i}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;b.a.listFileHistoryRecords(u.mb,1,u.a).then((function(t){if(0===t.data.length)throw e.setState({isLoading:!1}),Error("there has an error in server");e.initResultState(t.data)}))}},{key:"refershFileList",value:function(){var e=this;b.a.listFileHistoryRecords(u.mb,1,u.a).then((function(t){e.initResultState(t.data)}))}},{key:"initResultState",value:function(e){e.data.length&&this.setState({historyInfo:e.data,currentPage:e.page,hasMore:e.total_count>u.a*this.state.currentPage,isLoading:!1,isError:!1,fileOwner:e.data[0].creator_email})}},{key:"updateResultState",value:function(e){e.data.length&&this.setState({historyInfo:[].concat(Object(v.a)(this.state.historyInfo),Object(v.a)(e.data)),currentPage:e.page,hasMore:e.total_count>u.a*this.state.currentPage,isLoading:!1,isError:!1,fileOwner:e.data[0].creator_email})}},{key:"render",value:function(){return Object(I.jsx)("div",{className:"side-panel history-side-panel",children:Object(I.jsxs)("div",{className:"side-panel-center",children:[Object(I.jsx)("div",{className:"history-side-panel-title",children:Object(u.qb)("History Versions")}),Object(I.jsxs)("div",{className:"history-body",children:[this.state.isLoading&&Object(I.jsx)(j.a,{}),this.state.historyInfo&&Object(I.jsx)(w,{hasMore:this.state.hasMore,isReloadingData:this.state.isReloadingData,historyList:this.state.historyInfo,reloadMore:this.reloadMore,onItemClick:this.onItemClick,onItemRestore:this.onItemRestore})]})]})})}}]),n}(c.a.Component),_=n(153),S=n.n(_),M=n(260);n(280);var E=function(e){Object(r.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(a.a)(this,n);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).onSearchedClick=function(){},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){S.a.highlightAll()}},{key:"render",value:function(){return Object(I.jsx)("div",{className:"main-panel",children:Object(I.jsx)("div",{className:"main-panel-center content-viewer",children:Object(I.jsx)("div",{className:"markdown-viewer-render-content",children:this.props.renderingContent?Object(I.jsx)(j.a,{}):Object(I.jsx)("div",{className:"diff-view article",children:Object(I.jsx)(M.a,{scriptSource:u.Ob+"js/mathjax/tex-svg.js",newMarkdownContent:this.props.newMarkdownContent,oldMarkdownContent:this.props.oldMarkdownContent})})})})})}}]),n}(c.a.Component),F=n(10),R=(n(188),n(502),n(129),n(145),function(e){Object(r.a)(n,e);var t=Object(s.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).onSearchedClick=function(e){p.a.handleSearchedItemClick(e)},i.setDiffContent=function(e,t){i.setState({renderingContent:!1,newMarkdownContent:e,oldMarkdownContent:t})},i.onHistoryItemClick=function(e,t){i.setState({renderingContent:!0}),t?f.a.all([F.a.getFileRevision(u.ub,e.commit_id,e.path),F.a.getFileRevision(u.ub,t.commit_id,t.path)]).then(f.a.spread((function(e,t){f.a.all([F.a.getFileContent(e.data),F.a.getFileContent(t.data)]).then(f.a.spread((function(e,t){i.setDiffContent(e.data,t.data)})))}))):F.a.getFileRevision(u.ub,e.commit_id,e.path).then((function(e){f.a.all([F.a.getFileContent(e.data)]).then(f.a.spread((function(e){i.setDiffContent(e.data,"")})))}))},i.state={renderingContent:!0,newMarkdownContent:"",oldMarkdownContent:""},i}return Object(i.a)(n,[{key:"render",value:function(){return Object(I.jsxs)(o.Fragment,{children:[Object(I.jsxs)("div",{id:"header",className:"history-header",children:[Object(I.jsxs)("div",{className:"title",children:[Object(I.jsx)("a",{href:"javascript:window.history.back()",className:"go-back",title:"Back",children:Object(I.jsx)("span",{className:"fas fa-chevron-left"})}),Object(I.jsx)("span",{className:"name",children:u.lb})]}),Object(I.jsx)("div",{className:"toolbar",children:Object(I.jsx)(m.a,{onSearchedClick:this.onSearchedClick})})]}),Object(I.jsxs)("div",{id:"main",className:"history-content",children:[Object(I.jsx)(E,{newMarkdownContent:this.state.newMarkdownContent,oldMarkdownContent:this.state.oldMarkdownContent,renderingContent:this.state.renderingContent}),Object(I.jsx)(D,{onItemClick:this.onHistoryItemClick})]})]})}}]),n}(c.a.Component));l.a.render(Object(I.jsx)(R,{}),document.getElementById("wrapper"))},260:function(e,t,n){"use strict";var a=n(16),i=n(19),r=n(21),s=n(22),o=n(2),c=n.n(o),d=(n(43),n(108)),l=n(41),h=n(112),f=n.n(h);function u(e,t){if(!e.length&&!t.length)return 1;if(!e.length||!t.length)return 0;if(e.toUpperCase()===t.toUpperCase())return 1;if(1===e.length&&1===t.length)return 0;var n=v(e),a=v(t),i=n.length+a.length,r=0;return n.forEach((function(e){for(var t,n=0;t=a[n];n++)if(e===t){r++,a.splice(n,1);break}})),2*r/i}function p(e){return Array.isArray(e)?e.reduce((function(e,t){return e.concat(p(t))}),[]):[e]}function m(e){for(var t=[],n=0,a=e.length-1;n<a;n++)t[n]=e.substring(n,n+2);return t}function v(e){return p(e.toUpperCase().split(" ").map(m))}var b=n(12),j=n(50);function g(e,t){return e.type===t.type&&(!!f.a.isEqual(e,t)||(b.i.isText(e)&&b.i.isText(t)?u(e.text,t.text)>=.5&&"changed":(e.type===t.type&&(e.type.includes("ordered_list")||e.type.includes("unordered_list"))&&u(b.d.text(e),b.d.text(t))>=.5||e.type===t.type&&(e.children.length>1||t.children.length>1)&&"list_item"===e.type&&u(b.d.text(e),b.d.text(t))>=.5||e.type===t.type&&"paragraph"===e.type&&u(b.d.text(e),b.d.text(t))>=.5||e.type===t.type&&"table"===e.type&&u(b.d.text(e),b.d.text(t))>=.5||e.type===t.type&&"table_row"===e.type||e.type===t.type&&"table_cell"===e.type)&&"changed"))}function O(e,t){return e===t}var y=function(){function e(){var t=this;Object(a.a)(this,e),this.deepDiff=function(e,n,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=[],s=i+1,o=new I({equalFunc:a});o.ArrayDiff(e,n);for(var c=0;c<o.diff.length;c++){var d=o.diff[c],l=d.changeType;if("common"===l){var h={diff_state:"diff-common",new_index:d.newIndex,old_index:-1,node_depth:s};d.item.data=Object.assign(d.item.data?d.item.data:{},h)}else if("added"===l)if(b.i.isText(d.item))d.item.ADD=!0;else{var f={diff_state:"diff-added",new_index:d.newIndex,old_index:-1,node_depth:s};d.item.data=Object.assign(d.item.data?d.item.data:{},f)}else if("removed"===l)if(b.i.isText(d.item))d.item.DELETE=!0;else{var u={diff_state:"diff-removed",new_index:-1,old_index:d.oldIndex,node_depth:s};d.item.data=Object.assign(d.item.data?d.item.data:{},u)}else if("replaced"===l){var p=void 0,m=d.item.type||"text";if("text"===m?p=t.getTextDiff(d.newItem,d.oldItem):(m.includes("ordered_list")||m.includes("unordered_list")||m.includes("list_item")||"table"===m||"table_row"===m||"table_cell"===m||"paragraph"===m)&&(p=t.deepDiff(d.newItem.children,d.oldItem.children,a,s)),b.i.isText(d.item))d.item=p;else{var v={diff_state:"diff-replaced",new_index:-1,old_index:d.oldIndex,node_depth:s};d.item.data=Object.assign(d.item.data?d.item.data:{},v),d.item.children=p}}Array.isArray(d.item)?r=r.concat(d.item):r.push(d.item)}return r},this.getDiffDocument=function(e,n){var a=Object(j.a)(e),i=Object(j.a)(n),r=t.deepDiff(a,i,g);return r=t.splitTopDiffNodes(r)}}return Object(i.a)(e,[{key:"getTextDiff",value:function(e,t){var n=[],a=this.textDiff(e.text,t.text);return n=n.concat(a)}},{key:"textDiff",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=[],i=new I({equalFunc:O});i.StringDiff(e,t);var r=i.diff,s="",o=r[0].changeType;return r.forEach((function(e,t,i){var r="";"removed"===o?r="DELETE":"added"===o&&(r="ADD"),o===e.changeType?(s+=e.item,t===i.length-1&&a.push(Object(l.a)(Object(d.a)({text:s},r,!0),n))):e.changeType!==o&&(a.push(Object(l.a)(Object(l.a)({text:s},n),{},Object(d.a)({},r,!0))),o=e.changeType,s=e.item,t===i.length-1&&("removed"===o?r="DELETE":"added"===o&&(r="ADD"),a.push(Object(l.a)(Object(d.a)({text:s},r,!0),n))))})),a}},{key:"splitDiffParagraph",value:function(e){var t=f.a.cloneDeep(e),n=f.a.cloneDeep(e),a=[],i=[];return e.children.forEach((function(e,t,n){"link"===e.type||"image"===e.type?"diff-added"===e.data.diff_state?a.push(e):("diff-removed"===e.data.diff_state||a.push(e),i.push(e)):e.ADD?a.push(e):(e.DELETE||a.push(e),i.push(e))})),t.children=a,n.data.paragraph_state="old-paragraph",t.data.paragraph_state="new-paragraph",n.children=i,[n,t]}},{key:"splitTopDiffNodes",value:function(e){var t=this,n=[];return e.forEach((function(e){if("diff-replaced"===e.data.diff_state&&"paragraph"===e.type){var a=t.splitDiffParagraph(e);n.push(a[0],a[1])}else"diff-replaced"===e.data.diff_state&&"table"===e.type?(t.splitTableDiffParagraph(e),n.push(e)):n.push(e)})),n}},{key:"splitTableDiffParagraph",value:function(e){var t=this;return e.children.forEach((function(e,n,a){"diff-replaced"===e.data.diff_state&&e.children.forEach((function(e){if("diff-replaced"===e.data.diff_state&&"diff-replaced"===e.children[0].data.diff_state){var n=t.splitDiffParagraph(e.children[0]);e.children=n}}))})),e}}]),e}(),x=function(){function e(t,n,i){Object(a.a)(this,e),this.item=t,this.newIndex=n,this.oldIndex=i}return Object(i.a)(e,[{key:"added",value:function(){return void 0===this.oldIndex}},{key:"removed",value:function(){return void 0===this.newIndex}},{key:"common",value:function(){return void 0!==this.oldIndex&&void 0!==this.newIndex}}]),e}(),I=function(){function e(t){Object(a.a)(this,e),this.equalFunc=t.equalFunc?t.equalFunc:O,void 0!=t.shouldDetectChange?this.shouldDetectChange=t.shouldDetectChange:this.shouldDetectChange=!1,this.similarityFunc=t.similarityFunc}return Object(i.a)(e,[{key:"addAdded",value:function(e,t){var n=new x(e,t,void 0);n.changeType="added",this.added.push(n),this.diff.push(n)}},{key:"addRemoved",value:function(e,t){var n=new x(e,void 0,t);this.removed.push(n),n.changeType="removed",this.diff.push(n)}},{key:"addReplaced",value:function(e,t,n,a){var i=new x(e,a,n);i.newItem=t,i.oldItem=e,i.changeType="replaced",this.replaced.push(i),this.diff.push(i)}},{key:"addCommon",value:function(e,t,n,a){var i=new x(e,a,n);i.newItem=t,i.changeType="common",i.oldItem=e,this.common.push(i),this.diff.push(i)}},{key:"StringDiff",value:function(e,t){var n=e.length,a=t.length,i=0,r=0,s=[];for(s[n]=[],r=a;r>=0;s[n][r--]=0);for(i=n-1;i>=0;i--)for(s[i]=[],s[i][a]=0,r=a-1;r>=0;r--)this.equalFunc(e[i],t[r])?s[i][r]=s[i+1][r+1]+1:s[i][r]=Math.max(s[i+1][r],s[i][r+1]);for(this.common=[],this.added=[],this.removed=[],this.replaced=[],this.diff=[],i=r=0;i<n&&r<a;){if(this.equalFunc(e[i],t[r])){var o=e[i],c=t[r];this.addCommon(c,o,r,i),i++,r++}else s[i+1][r]>=s[i][r+1]?(this.addAdded(e[i],i),i++):(this.addRemoved(t[r],r),r++)}for(;i<n;i++)this.addAdded(e[i],i);for(;r<a;r++)this.addRemoved(t[r],r)}},{key:"ArrayDiff",value:function(e,t,n){var a=e.length,i=t.length,r=0,s=0,o=[];for(o[a]=[],s=i;s>=0;o[a][s--]=0);for(r=a-1;r>=0;r--)for(o[r]=[],o[r][i]=0,s=i-1;s>=0;s--)this.equalFunc(e[r],t[s])?o[r][s]=o[r+1][s+1]+1:o[r][s]=Math.max(o[r+1][s],o[r][s+1]);for(this.common=[],this.added=[],this.removed=[],this.replaced=[],this.diff=[],r=s=0;r<a&&s<i;){var c=this.equalFunc(e[r],t[s]);if(c){var d=e[r],l=t[s];"changed"===c?this.addReplaced(l,d,s,r):this.addCommon(l,d,s,r),n&&n("C",s,r),r++,s++}else o[r+1][s]>=o[r][s+1]?(this.addAdded(e[r],r),n&&n("A",0,r),r++):(this.addRemoved(t[s],s),n&&n("D",s,0),s++)}for(;r<a;r++)this.addAdded(e[r],r),n&&n("A",0,r);for(;s<i;s++)this.addRemoved(t[s],s),n&&n("D",s,0)}}]),e}(),k=n(75),w=n(221),C=n(160),D=(n(501),function(e){Object(r.a)(n,e);var t=Object(s.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).renderDiffNode=function(e){var t=e.element,n=t.data?t.data:{},a=n.diff_state,i=n.node_depth;return"diff-added"===a?i>1?"blockquote"===t.type||"code_block"===t.type?c.a.createElement("div",{className:"diff-added-container"},Object(k.b)(e)):Object(k.b)(e):c.a.createElement("div",{className:"diff-added"},Object(k.b)(e)):"diff-removed"===a?i>1?"blockquote"===t.type||"code_block"===t.type?c.a.createElement("div",{className:"diff-removed-container"},Object(k.b)(e)):Object(k.b)(e):c.a.createElement("div",{className:"diff-removed"},Object(k.b)(e)):"diff-replaced"===a?i>1?Object(k.b)(e):c.a.createElement("div",{className:"diff-replaced"},Object(k.b)(e)):Object(k.b)(e)},i.value=[],i.slateDiff=new y,i}return Object(i.a)(n,[{key:"render",value:function(){var e=this.props.newMarkdownContent,t=this.props.oldMarkdownContent;return this.value=this.slateDiff.getDiffDocument(e,t),c.a.createElement(C.a,{scriptSource:this.props.scriptSource},c.a.createElement(w.a,{style:{width:"100%"},renderDiffElement:this.renderDiffNode,renderDiffLeaf:k.a,value:this.value}))}}]),n}(c.a.PureComponent));t.a=D},501:function(e,t,n){},502:function(e,t,n){}},[[1478,1,0]]]);
//# sourceMappingURL=fileHistory.chunk.js.map