(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[29],{1683:function(e,a,t){t(54),e.exports=t(1695)},1684:function(e,a,t){},1695:function(e,a,t){"use strict";t.r(a);var r=t(6),i=t(7),l=t(9),n=t(8),s=t(2),o=t.n(s),d=t(24),c=t.n(d),p=t(5),u=t(10),b=t(1),m=t(96),h=t(67),f=t(27),j=t(249),g=t.n(j),O=t(153),v=t.n(O),F=t(4),x=t(0),U="uploading",k="error",S="isSaving",y="uploaded",C=function(e){Object(l.a)(t,e);var a=Object(n.a)(t);function t(e){var i;return Object(r.a)(this,t),(i=a.call(this,e)).onUploadCancel=function(e){e.preventDefault(),i.props.onUploadCancel(i.props.resumableFile)},i.onUploadRetry=function(e){e.preventDefault(),i.props.onUploadRetry(i.props.resumableFile)},i.formatFileSize=function(e){return"number"!==typeof e?"":e>=1e9?(e/1e9).toFixed(1)+" G":e>=1e6?(e/1e6).toFixed(1)+" M":e>=1e3?(e/1e3).toFixed(1)+" K":e.toFixed(1)+" B"},i.state={uploadState:U},i}return Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){var a=e.resumableFile,t=U;a.error?t=k:(0!==a.remainingTime||a.isSaved||(t=S),a.isSaved&&(t=y)),this.setState({uploadState:t})}},{key:"render",value:function(){var e=this.props.resumableFile,a=Math.round(100*e.progress()),t=e.error;return Object(x.jsxs)("tr",{className:"file-upload-item",children:[Object(x.jsx)("td",{className:"upload-name",children:Object(x.jsx)("div",{className:"ellipsis",children:e.newFileName})}),Object(x.jsx)("td",{children:Object(x.jsx)("span",{className:"file-size",children:this.formatFileSize(e.size)})}),Object(x.jsxs)("td",{className:"upload-progress",children:[(this.state.uploadState===U||this.state.uploadState===S)&&Object(x.jsxs)(s.Fragment,{children:[e.size>=1e8&&Object(x.jsxs)(s.Fragment,{children:[e.isUploading()&&Object(x.jsxs)("div",{className:"progress-container",children:[Object(x.jsx)("div",{className:"progress",children:Object(x.jsx)("div",{className:"progress-bar",role:"progressbar",style:{width:"".concat(a,"%")},"aria-valuenow":a,"aria-valuemin":"0","aria-valuemax":"100"})}),-1===e.remainingTime&&Object(x.jsx)("div",{className:"progress-text",children:Object(b.nb)("Preparing to upload...")}),e.remainingTime>0&&Object(x.jsxs)("div",{className:"progress-text",children:[Object(b.nb)("Remaining")," ",p.a.formatTime(e.remainingTime)]}),0===e.remainingTime&&Object(x.jsx)("div",{className:"progress-text",children:Object(b.nb)("Indexing...")})]}),!e.isUploading()&&Object(x.jsx)("div",{className:"progress-container d-flex align-items-center",children:Object(x.jsx)("div",{className:"progress",children:Object(x.jsx)("div",{className:"progress-bar",role:"progressbar",style:{width:"".concat(a,"%")},"aria-valuenow":a,"aria-valuemin":"0","aria-valuemax":"100"})})})]}),e.size<1e8&&Object(x.jsx)("div",{className:"progress-container d-flex align-items-center",children:Object(x.jsx)("div",{className:"progress",children:Object(x.jsx)("div",{className:"progress-bar",role:"progressbar",style:{width:"".concat(a,"%")},"aria-valuenow":a,"aria-valuemin":"0","aria-valuemax":"100"})})})]}),this.state.uploadState===k&&Object(x.jsx)("div",{className:"message err-message ml-0",dangerouslySetInnerHTML:{__html:t}})]}),Object(x.jsx)("td",{className:"upload-operation",children:Object(x.jsxs)(s.Fragment,{children:[this.state.uploadState===U&&Object(x.jsx)("a",{href:"#",onClick:this.onUploadCancel,children:Object(b.nb)("Cancel")}),this.state.uploadState===k&&Object(x.jsx)("a",{href:"#",onClick:this.onUploadRetry,children:Object(b.nb)("Retry")}),this.state.uploadState===S&&Object(x.jsx)("span",{className:"saving",children:Object(b.nb)("Saving...")}),this.state.uploadState===y&&Object(x.jsx)("span",{className:"uploaded",children:Object(b.nb)("Uploaded")})]})})]})}}]),t}(o.a.Component),N=function(e){Object(l.a)(t,e);var a=Object(n.a)(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){var e=this.props.file,a=Object(b.nb)("Please upload files less than {placeholder}M").replace("{placeholder}",b.Kb);return Object(x.jsxs)("tr",{className:"file-upload-item",children:[Object(x.jsx)("td",{className:"upload-name",children:Object(x.jsx)("div",{className:"ellipsis",children:e.name})}),Object(x.jsx)("td",{colSpan:3,className:"error",children:a})]})}}]),t}(o.a.Component),L=function(e){Object(l.a)(t,e);var a=Object(n.a)(t);function t(e){var i;return Object(r.a)(this,t),(i=a.call(this,e)).toggleDropdown=function(){i.setState({dropdownOpen:!i.state.dropdownOpen})},i.state={dropdownOpen:!1},i}return Object(i.a)(t,[{key:"render",value:function(){var e=this,a=this.props.allFilesUploaded;return Object(x.jsxs)(s.Fragment,{children:[Object(x.jsxs)("div",{className:"text-center",children:[Object(x.jsxs)(F.d,{isOpen:this.state.dropdownOpen,toggle:this.toggleDropdown,children:[Object(x.jsx)(F.o,{color:"primary",caret:!0,children:Object(b.nb)("Upload")}),Object(x.jsxs)(F.n,{children:[Object(x.jsx)(F.m,{onClick:this.props.onFileUpload,children:Object(b.nb)("Upload Files")}),Object(x.jsx)(F.m,{onClick:this.props.onFolderUpload,children:Object(b.nb)("Upload Folder")})]})]}),Object(x.jsx)(F.c,{color:"primary",outline:!0,className:"ml-4",onClick:this.props.onCancelAllUploading,disabled:a,children:Object(b.nb)("Cancel All")})]}),Object(x.jsx)("div",{className:"mt-4 mh-2",children:Object(x.jsxs)("table",{className:"table-thead-hidden",children:[Object(x.jsx)("thead",{children:Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{width:"35%",children:Object(b.nb)("name")}),Object(x.jsx)("th",{width:"15%",children:Object(b.nb)("size")}),Object(x.jsx)("th",{width:"35%",children:Object(b.nb)("progress")}),Object(x.jsx)("th",{width:"15%",children:Object(b.nb)("state")})]})}),Object(x.jsxs)("tbody",{children:[this.props.forbidUploadFileList.map((function(e,a){return Object(x.jsx)(N,{file:e},a)})),this.props.uploadFileList.map((function(a,t){return Object(x.jsx)(C,{resumableFile:a,onUploadCancel:e.props.onUploadCancel,onUploadRetry:e.props.onUploadRetry},t)})).reverse()]})]})})]})}}]),t}(o.a.Component),w=t(11),I=(t(510),function(e){Object(l.a)(t,e);var a=Object(n.a)(t);function t(e){var i;return Object(r.a)(this,t),(i=a.call(this,e)).componentWillUnmount=function(){window.onbeforeunload=null,!0===i.props.dragAndDrop&&i.resumable.disableDropOnDocument()},i.onbeforeunload=function(){if(window.uploader&&window.uploader.isUploadProgressDialogShow&&100!==window.uploader.totalProgress)return""},i.bindCallbackHandler=function(){var e=i.props,a=e.minFileSizeErrorCallback,t=e.fileTypeErrorCallback;i.maxFilesErrorCallback&&(i.resumable.opts.maxFilesErrorCallback=i.maxFilesErrorCallback),a&&(i.resumable.opts.minFileSizeErrorCallback=i.props.minFileSizeErrorCallback),i.maxFileSizeErrorCallback&&(i.resumable.opts.maxFileSizeErrorCallback=i.maxFileSizeErrorCallback),t&&(i.resumable.opts.fileTypeErrorCallback=i.props.fileTypeErrorCallback)},i.bindEventHandler=function(){i.resumable.on("chunkingComplete",i.onChunkingComplete.bind(Object(f.a)(i))),i.resumable.on("fileAdded",i.onFileAdded.bind(Object(f.a)(i))),i.resumable.on("fileProgress",i.onFileProgress.bind(Object(f.a)(i))),i.resumable.on("fileSuccess",i.onFileUploadSuccess.bind(Object(f.a)(i))),i.resumable.on("fileError",i.onFileError.bind(Object(f.a)(i))),i.resumable.on("uploadStart",i.onUploadStart.bind(Object(f.a)(i))),i.resumable.on("progress",i.onProgress.bind(Object(f.a)(i))),i.resumable.on("complete",i.onComplete.bind(Object(f.a)(i))),i.resumable.on("error",i.onError.bind(Object(f.a)(i))),i.resumable.on("dragstart",i.onDragStart.bind(Object(f.a)(i)))},i.maxFilesErrorCallback=function(e,a){var t=b.Jb,r=Object(b.nb)("Please upload no more than {maxFiles} files at a time.");r=r.replace("{maxFiles}",t),w.a.danger(r)},i.maxFileSizeErrorCallback=function(e){var a=i.state.forbidUploadFileList;a.push(e),i.setState({forbidUploadFileList:a})},i.onChunkingComplete=function(e){!0===i.state.allFilesUploaded&&i.setState({allFilesUploaded:!1});var a=i.props.path,t=e.fileName,r=e.relativePath,l=t===r;if(e.formData={},l)e.formData={parent_dir:a};else{var n=r.slice(0,r.lastIndexOf("/")+1);e.formData={parent_dir:a,relative_path:n}}},i.onFileAdded=function(e,a){if(e.fileName===e.relativePath&&1===a.length){i.setUploadFileList(i.resumable.files),u.a.sharedUploadLinkGetFileUploadUrl(i.props.token).then((function(a){i.resumable.opts.target=a.data.upload_link+"?ret-json=1",i.resumableUpload(e)})).catch((function(e){var a=p.a.getErrorMsg(e);w.a.danger(a)}))}else i.setUploadFileList(i.resumable.files),i.isUploadLinkLoaded||(i.isUploadLinkLoaded=!0,u.a.sharedUploadLinkGetFileUploadUrl(i.props.token).then((function(e){i.resumable.opts.target=e.data.upload_link+"?ret-json=1",i.resumable.upload()})).catch((function(e){var a=p.a.getErrorMsg(e);w.a.danger(a)})))},i.resumableUpload=function(e){var a=i.props,t=a.repoID,r=a.path;u.a.getFileUploadedBytes(t,r,e.fileName).then((function(a){var t=a.data.uploadedBytes,r=1024*parseInt(b.Yb)*1024||1048576,l=Math.floor(t/r);e.markChunksCompleted(l),i.resumable.upload()})).catch((function(e){var a=p.a.getErrorMsg(e);w.a.danger(a)}))},i.filesAddedComplete=function(e,a){i.state.forbidUploadFileList.length>0&&0===a.length&&i.setState({isUploadProgressDialogShow:!0,totalProgress:100})},i.setUploadFileList=function(){var e=i.resumable.files;i.setState({uploadFileList:e,isUploadProgressDialogShow:!0}),p.a.registerGlobalVariable("uploader","isUploadProgressDialogShow",!0)},i.onFileProgress=function(e){var a=i.getBitrate(),t=i.state.uploadFileList.map((function(t){if(t.uniqueIdentifier===e.uniqueIdentifier&&a){var r=8*(t.size-t.size*t.progress()),i=Math.floor(r/a);t.remainingTime=i}return t}));i.setState({uploadBitrate:a,uploadFileList:t})},i.getBitrate=function(){var e=0,a=0,t=(new Date).getTime();if(i.resumable.files.forEach((function(a){e+=a.progress()*a.size})),i.timestamp){var r=t-i.timestamp;if(r<i.bitrateInterval)return i.state.uploadBitrate;(e<i.loaded||0===i.loaded)&&(i.loaded=e),a=(e-i.loaded)*(1e3/r)*8}return i.timestamp=t,i.loaded=e,a},i.onUploadStart=function(){var e=Object(b.nb)("File upload started");w.a.notify(e)},i.onProgress=function(){var e=Math.round(100*i.resumable.progress());i.setState({totalProgress:e}),p.a.registerGlobalVariable("uploader","totalProgress",e)},i.onFileUploadSuccess=function(e,a){var t=e.formData,r=(new Date).getTime()/1e3;if(a=t.replace?a:JSON.parse(a)[0],t.relative_path){var l=t.relative_path,n=l.slice(0,l.indexOf("/")),s={id:a.id,name:n,type:"dir",mtime:r};i.notifiedFolders.some((function(e){return e.name===s.name}))||(i.notifiedFolders.push(s),i.props.onFileUploadSuccess(s));var o=i.state.uploadFileList.map((function(t){return t.uniqueIdentifier===e.uniqueIdentifier&&(t.newFileName=l+a.name,t.isSaved=!0),t}));i.setState({uploadFileList:o})}else if(t.replace){var d=e.fileName,c={id:a,name:d,type:"file",mtime:r};i.props.onFileUploadSuccess(c);var p=i.state.uploadFileList.map((function(a){return a.uniqueIdentifier===e.uniqueIdentifier&&(a.newFileName=d,a.isSaved=!0),a}));i.setState({uploadFileList:p})}else{var u={id:a.id,type:"file",name:a.name,size:a.size,mtime:r};i.props.onFileUploadSuccess(u);var b=i.state.uploadFileList.map((function(t){return t.uniqueIdentifier===e.uniqueIdentifier&&(t.newFileName=a.name,t.isSaved=!0),t}));i.setState({uploadFileList:b})}},i.onFileError=function(e,a){var t="";if(a){var r=a.replace(/\n/g,"");r=JSON.parse(r),"File locked by others."===(t=r.error)&&(t=Object(b.nb)("File is locked by others.")),"Internal error."===t&&(t=Object(b.nb)("Internal Server Error"))}else t=Object(b.nb)("Network error");var l=i.state.uploadFileList.map((function(a){return a.uniqueIdentifier===e.uniqueIdentifier&&(i.state.retryFileList.push(a),a.error=t),a}));i.loaded=0,i.setState({retryFileList:i.state.retryFileList,uploadFileList:l})},i.onComplete=function(){if(!i.error){var e=Object(b.nb)("All files uploaded");w.a.success(e)}i.error=!1,i.notifiedFolders=[],i.isUploadLinkLoaded=!1,i.setState({allFilesUploaded:!0})},i.onError=function(e,a){var t=Object(b.nb)("Error");a&&a.fileName&&(t=Object(b.nb)("Failed to upload {file_name}.").replace("{file_name}",a.fileName)),w.a.danger(t,{id:"file-error-msg"}),i.error=!0,i.isUploadLinkLoaded=!1,p.a.registerGlobalVariable("uploader","totalProgress",100)},i.setHeaders=function(e,a){var t=a.offset,r=a.getOpt("chunkSize"),i=0===e.size?1:e.size,l=0!==t?t*r:0,n=Math.min(i,(t+1)*r)-1;return i-a.endByte<r&&!a.getOpt("forceChunkSize")&&(n=i),{Accept:"application/json; text/javascript, */*; q=0.01","Content-Disposition":'attachment; filename="'+encodeURI(e.fileName)+'"',"Content-Range":"bytes "+l+"-"+n+"/"+i}},i.setQuery=function(e){return e.formData},i.generateUniqueIdentifier=function(e){var a=e.webkitRelativePath||e.relativePath||e.fileName||e.name;return v()(a+new Date)+a},i.onClick=function(e){e.nativeEvent.stopImmediatePropagation(),e.stopPropagation()},i.onFileUpload=function(){i.uploadInput.current.removeAttribute("webkitdirectory"),i.uploadInput.current.click()},i.onFolderUpload=function(){i.uploadInput.current.setAttribute("webkitdirectory","webkitdirectory"),i.uploadInput.current.click()},i.onDragStart=function(){i.uploadInput.current.setAttribute("webkitdirectory","webkitdirectory")},i.onCloseUploadDialog=function(){i.loaded=0,i.resumable.files=[],i.isUploadLinkLoaded=!1,i.setState({isUploadProgressDialogShow:!1,uploadFileList:[],forbidUploadFileList:[]}),p.a.registerGlobalVariable("uploader","isUploadProgressDialogShow",!1)},i.onUploadCancel=function(e){var a=i.state.uploadFileList.filter((function(a){return a.uniqueIdentifier!==e.uniqueIdentifier||(a.cancel(),!1)}));i.resumable.isUploading()||(i.setState({totalProgress:"100",allFilesUploaded:!0}),i.loaded=0),i.setState({uploadFileList:a})},i.onCancelAllUploading=function(){var e=i.state.uploadFileList.filter((function(e){return!Math.round(1!==e.progress())||(e.cancel(),!1)}));i.loaded=0,i.setState({allFilesUploaded:!0,totalProgress:"100",uploadFileList:e}),i.isUploadLinkLoaded=!1},i.onUploadRetry=function(e){u.a.sharedUploadLinkGetFileUploadUrl(i.props.token).then((function(a){i.resumable.opts.target=a.data.upload_link+"?ret-json=1";var t=i.state.retryFileList.filter((function(a){return a.uniqueIdentifier!==e.uniqueIdentifier})),r=i.state.uploadFileList.map((function(a){return a.uniqueIdentifier===e.uniqueIdentifier&&(a.error=null,i.retryUploadFile(a)),a}));i.setState({retryFileList:t,uploadFileList:r})})).catch((function(e){var a=p.a.getErrorMsg(e);w.a.danger(a)}))},i.retryUploadFile=function(e){var a=i.props,t=a.repoID,r=a.path,l=e.fileName;if(!(e.fileName===e.relativePath)){var n=e.formData.relative_path;l=("/"===r?r+n:r+"/"+n)+l}e.bootstrap();var s=!1;e.resumableObj.on("chunkingComplete",(function(){s||u.a.getFileUploadedBytes(t,r,l).then((function(a){var t=a.data.uploadedBytes,r=1024*parseInt(b.Yb)*1024||1048576,i=Math.floor(t/r);e.markChunksCompleted(i),e.resumableObj.upload()})).catch((function(e){var a=p.a.getErrorMsg(e);w.a.danger(a)})),s=!0}))},i.replaceRepetitionFile=function(){var e=i.props,a=e.repoID,t=e.path;u.a.getUpdateLink(a,t).then((function(e){i.resumable.opts.target=e.data;var a=i.resumable.files[i.resumable.files.length-1];a.formData.replace=1,a.formData.target_file=a.formData.parent_dir+a.fileName,i.setUploadFileList(i.resumable.files),i.resumable.upload()})).catch((function(e){var a=p.a.getErrorMsg(e);w.a.danger(a)}))},i.cancelFileUpload=function(){i.resumable.files.pop()},i.state={retryFileList:[],uploadFileList:[],forbidUploadFileList:[],totalProgress:0,isUploadProgressDialogShow:!1,currentResumableFile:null,uploadBitrate:0,allFilesUploaded:!1},i.uploadInput=o.a.createRef(),i.notifiedFolders=[],i.timestamp=null,i.loaded=0,i.bitrateInterval=500,i.isUploadLinkLoaded=!1,window.onbeforeunload=i.onbeforeunload,i}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.resumable=new g.a({target:"",query:this.setQuery||{},fileType:this.props.filetypes,maxFiles:b.Jb||void 0,maxFileSize:1e3*b.Kb*1e3||void 0,testMethod:this.props.testMethod||"post",testChunks:this.props.testChunks||!1,headers:this.setHeaders||{},withCredentials:this.props.withCredentials||!1,chunkSize:1024*parseInt(b.Yb)*1024||1048576,simultaneousUploads:this.props.simultaneousUploads||1,fileParameterName:this.props.fileParameterName,generateUniqueIdentifier:this.generateUniqueIdentifier,forceChunkSize:!0,maxChunkRetries:3,minFileSize:0}),this.resumable.assignBrowse(this.uploadInput.current,!0),this.props.dragAndDrop&&this.resumable.assignDrop(document.getElementById("upload-link-drop-zone")),this.bindCallbackHandler(),this.bindEventHandler()}},{key:"render",value:function(){return Object(x.jsxs)(s.Fragment,{children:[Object(x.jsx)("div",{className:"file-uploader-container",children:Object(x.jsx)("div",{className:"file-uploader",children:Object(x.jsx)("input",{className:"upload-input",type:"file",ref:this.uploadInput,onClick:this.onClick})})}),Object(x.jsx)(L,{retryFileList:this.state.retryFileList,uploadFileList:this.state.uploadFileList,forbidUploadFileList:this.state.forbidUploadFileList,totalProgress:this.state.totalProgress,uploadBitrate:this.state.uploadBitrate,allFilesUploaded:this.state.allFilesUploaded,onCloseUploadDialog:this.onCloseUploadDialog,onCancelAllUploading:this.onCancelAllUploading,onUploadCancel:this.onUploadCancel,onUploadRetry:this.onUploadRetry,onFileUpload:this.onFileUpload,onFolderUpload:this.onFolderUpload})]})}}]),t}(o.a.Component)),D=(t(1684),window.app.pageOptions.username),P=window.uploadLink,z=P.dirName,E=P.sharedBy,_=P.noQuota,M=P.maxUploadFileSize,q=P.token,A=P.repoID,R=P.path,T=function(e){Object(l.a)(t,e);var a=Object(n.a)(t);function t(){var e;Object(r.a)(this,t);for(var i=arguments.length,l=new Array(i),n=0;n<i;n++)l[n]=arguments[n];return(e=a.call.apply(a,[this].concat(l))).onFileUploadSuccess=function(e){var a=e.name;e.size;u.a.shareLinksUploadDone(q,p.a.joinPath(R,a))},e}return Object(i.a)(t,[{key:"render",value:function(){var e=this;return Object(x.jsxs)("div",{className:"h-100 d-flex flex-column",children:[Object(x.jsxs)("div",{className:"top-header d-flex justify-content-between",children:[Object(x.jsx)(m.a,{}),D&&Object(x.jsx)(h.a,{})]}),Object(x.jsx)("div",{className:"o-auto",children:Object(x.jsxs)("div",{className:"py-4 px-6 mx-auto rounded",id:"upload-link-panel",children:[Object(x.jsx)("h3",{className:"h5",dangerouslySetInnerHTML:{__html:Object(b.nb)("Upload files to {folder_name_placeholder}").replace("{folder_name_placeholder}",'<span class="op-target">'.concat(p.a.HTMLescape(z),"</span>"))}}),Object(x.jsx)("p",{className:"small shared-by",dangerouslySetInnerHTML:{__html:"".concat(Object(b.nb)("shared by:")," ").concat(E.avatar," ").concat(E.name)}}),_?Object(x.jsxs)("div",{className:"py-6 text-center",children:[Object(x.jsx)("span",{className:"sf3-font sf3-font-tips warning-icon"}),Object(x.jsx)("p",{children:Object(b.nb)("The owner of this library has run out of space.")})]}):Object(x.jsxs)(s.Fragment,{children:[Object(x.jsxs)("ol",{className:"small text-gray",children:[Object(x.jsx)("li",{className:"tip-list-item",children:Object(b.nb)("Folder upload is limited to Chrome, Firefox 50+, and Microsoft Edge.")}),M&&Object(x.jsx)("li",{className:"tip-list-item",children:Object(b.nb)("File size should be smaller than {max_size_placeholder}.").replace("{max_size_placeholder}",M)})]}),Object(x.jsxs)("div",{id:"upload-link-drop-zone",className:"text-center mt-2 mb-4",children:[Object(x.jsx)("span",{className:"sf3-font sf3-font-upload upload-icon"}),Object(x.jsx)("p",{className:"small text-gray mb-0",children:Object(b.nb)("Drag and drop files or folders here.")})]}),Object(x.jsx)(I,{ref:function(a){return e.uploader=a},dragAndDrop:!0,token:q,repoID:A,path:R,onFileUploadSuccess:this.onFileUploadSuccess})]})]})})]})}}]),t}(o.a.Component);c.a.render(Object(x.jsx)(T,{}),document.getElementById("wrapper"))}},[[1683,1,0]]]);
//# sourceMappingURL=uploadLink.chunk.js.map