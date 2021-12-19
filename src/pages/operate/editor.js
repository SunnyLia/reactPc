import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class Editors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tinymceHtml: "hello,world",
            init: {
                language_url: 'http://tinymce.ax-z.cn/static/tiny/langs/zh_CN.js',
                language: 'zh_CN',
                height: 500,
                menubar: false, // 隐藏最上方menu菜单
                toolbar: true, // 隐藏工具栏
                branding: false, // 隐藏右下角水印
                statusbar: true, // 隐藏编辑器底部的状态栏
                elementpath: false, //隐藏底栏的元素路径
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor emoticons',
                    'searchreplace visualblocks code fullscreen toc fullpage autosave nonbreaking visualchars searchreplace spellchecker pagebreak',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: [
                    "newdocument undo redo | formatselect visualaid|cut copy paste selectall| bold italic underline strikethrough |codeformat blockformats| superscript subscript  | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent |  removeformat ",
                    "code  bullist numlist | lists image media table link |fullscreen help toc fullpage restoredraft nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak anchor charmap  pastetext print preview hr emoticons"
                ],
                images_upload_handler: function (blobInfo, succFun, failFun) {
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open("POST", "https://httpbin.org/post");
                    xhr.onload = function () {
                        var json;
                        if (xhr.status != 200) {
                            failFun("HTTP Error: " + xhr.status);
                            return;
                        }
                        json = JSON.parse(xhr.responseText);
                        if (!json || !json.files.file) {
                            failFun("Invalid JSON: " + xhr.responseText);
                            return;
                        }
                        succFun(json.files.file);
                    };
                    formData = new FormData();
                    formData.append("file", blobInfo.blob(), blobInfo.filename());
                    xhr.send(formData);
                },
                file_picker_callback: function (callback, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    //input.setAttribute('accept', '.jpg,.png'); //限制上传的文件类型
                    input.click();
                    input.onchange = function () {
                        var file = this.files[0];
                        var xhr, formData;
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open('POST', 'https://httpbin.org/post');
                        xhr.onload = function () {
                            if (xhr.status != 200) {
                                alert('HTTP Error: ' + xhr.status);
                                return;
                            }
                            var json = JSON.parse(xhr.responseText);
                            callback(json.files.file, {text: file.name});
                        };
                        formData = new FormData();
                        formData.append('file', file, file.name);
                        xhr.send(formData);
                    }
                }
            }
        }
    }
    handleEditorChange = (e) => {
        // console.log('Content was updated:', e.target.getContent());
    }

    render() {
        return (
            <Editor
                initialValue={this.state.tinymceHtml}
                init={this.state.init}
                onChange={this.handleEditorChange}
            />
        );
    }
}

export default Editors;