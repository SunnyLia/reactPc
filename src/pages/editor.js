import React from 'react';
import { Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

class Editors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tinymceHtml: "hello,world",
            init:{
     
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
            }
        }
    }
    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
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