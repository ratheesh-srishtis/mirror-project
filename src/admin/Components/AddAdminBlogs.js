import React, { useState} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../css/addblogs.css";
import { MyCustomUploadAdapterPlugin } from "../../config/MyUploadAdapter";
import { notifyError, notifySuccess } from "../../config/NotificationService";
import { addBlogByAdmin } from "../../config/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function AddAdminBlogs({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
    const naviagate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!title.trim() || !content.trim()) {
    notifyError("Title and content are required");
    return;
  }

  try {
    const response = await addBlogByAdmin(title, content);
    
    // Show sweet alert popup
    Swal.fire({
      icon: 'success',
      title: 'Blog Submitted Successfully!',
      text: 'Your blog has been created.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3b82f6',
      timer: 9000,
      timerProgressBar: true,
    });
    
    // Close the dialog after successful submission
    // You'll need to pass a closeDialog function as prop
    naviagate('/admin/manage-blogs');
    
    console.log("Blog saved:", response.data);
  } catch (error) {
    notifyError(
      error.response?.data?.message || 
      error.message || 
      "Failed to save blog"
    );
    console.error("Error saving blog:", error);
  }
};

  return (
    <div className="addblogs-container">
      <form className="addblogs-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="blog-title">Title</label>
          <input
            type="text"
            id="blog-title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="blog-content">Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={content}
         onReady={editor => {
  // Register the upload adapter when editor is ready
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new (require('../../config/MyUploadAdapter').default)(loader);
  };
}}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "blockQuote",
                "insertTable",
                "imageUpload", // This will now work with Cloudinary
                "|",
                "undo",
                "redo"
              ],
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "imageStyle:full",
                  "imageStyle:side",
                  "linkImage"
                ],
              },
            }}
          />
        </div>
        <button type="submit" className="form-save-btn">
          Save Blog
        </button>
      </form>
    </div>
  );
}

export default AddAdminBlogs;