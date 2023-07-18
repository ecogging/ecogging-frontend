import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef } from 'react';
import '../../../styles/plogging/review/TextEditor.css';

export default function TextEditor(){
    const editorRef=useRef();

    return(
        <div className='edit_wrap'>
            <Editor
                className="editor"
                initialValue='입력......'
                previewStyle='vertical'
                initialEditType='wysiwyg'
                useCommandShortcut={false}
                language='Ko-KR'
                width="100%"
                height="100%"
                ref={editorRef}
                plugins={[colorSyntax]}
            />
        </div>
    );
}