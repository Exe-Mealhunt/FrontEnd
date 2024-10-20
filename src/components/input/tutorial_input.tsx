import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProp = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export default function TextEditor({ text, setText }: TextEditorProp) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          className="rouned-md bg-white text-black"
          value={text}
          onChange={setText}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          }}
        />
      </form>
    </div>
  );
}
