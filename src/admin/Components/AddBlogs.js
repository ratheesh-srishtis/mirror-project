import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../css/addblogs.css";

function AddBlogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content });
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
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
            config={{
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
                "undo",
                "redo",
                "imageUpload",
              ],
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "imageStyle:full",
                  "imageStyle:side",
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

export default AddBlogs;
