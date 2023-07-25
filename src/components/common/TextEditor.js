import { Editor } from '@toast-ui/react-editor';
import axios from "axios";
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState, useEffect } from 'react';
import '../../styles/common/TextEditor.css';

export default function TextEditor({onEditorDataChange}){
    const editorRef=useRef();
    const [editorData, setEditorData]=useState('');
 
    // useEffect(()=>{
    //     editorRef.current.getInstance().setHTML(initialValue);
    // },[]);

  
    // console.log(initialValue)
    // ;
    const handleEditorChange=(data)=>{
        // setEditorData(data);

        onEditorDataChange(data);
    };
    
    const onChange=()=>{
        //html형식으로 가져오려면 getHTML()  마크다운형식으로 가져오려면 getMarkdown()
        const data=editorRef.current.getInstance().getHTML();
        // const data2=editorRef.current.getInstance().getHTML().getData();
        console.log("data : "+data);
        // console.log("data2 : "+data2);
        handleEditorChange(data);
    };

    const uploadImage=async(blob)=>{
        console.log(blob);
        try {
            const formData=new FormData();
            // const file=new File([blob], encodeURI(blob.name),{
            //     type:blob.type,
            // });
            formData.append("file",blob);
    
            const response=await axios.post(`http://localhost:8080/reviewImgUpload`, formData,
            {
                headers:{'Content-Type': 'multipart/form-data'},
                withCredentials:true
            })
            // const url=`/images/${response.data.filename}`;
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const onUploadImage=async(blob,callback)=>{
        const url=await uploadImage(blob);
        //url  ,  alt text
        if(url!==null){
            console.log(url);
            callback(url,'이미지에러');
        }else{
            console.log("이미지 로드 실패");
        }
        return false;
    };
    

    return(
        <div className='edit_wrap'>
            <Editor
                className="editor"
                ref={editorRef}
                // initialValue={initialValue}  initialValue={editorData}
                previewStyle='vertical'
                initialEditType='wysiwyg'
                useCommandShortcut={false}
                language='Ko-KR'
                width="100%"
                height="100%"
                onChange={onChange}
                // onChange={(e)=>handleEditorChange(e.target.value)}
                plugins={[colorSyntax]}


                hooks={{
                    addImageBlobHook: onUploadImage
                }}
            />
        </div>
    );
}