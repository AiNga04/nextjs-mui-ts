"use client";
import React, { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import "./theme.scss";
import { InputAudioFileUpload } from "@/components/button/upload.btn";
import { useSession } from "next-auth/react";
import axios from "axios";

const Step1 = () => {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const { data: session } = useSession();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () =>
          console.log(`${file.name}: file reading was aborted`);
        reader.onerror = () =>
          console.log(`${file.name}: file reading has failed`);
        reader.onload = () => {
          const binaryStr = reader.result;
          console.log(`${file.name}:`, binaryStr);

          try {
            const formData = new FormData();
            formData.append("fileUpload", file);
            axios.post("http://localhost:8000/api/v1/files/upload", formData, {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
            });
          } catch (error) {
            console.log(error);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [session]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: [".mp3", ".m4a", ".wav"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <div
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <InputAudioFileUpload />
        </div>
        <p>Drag files here or select to upload</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>
          {files.length > 0 ? (
            files.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
              </li>
            ))
          ) : (
            <li>No files uploaded</li>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Step1;
