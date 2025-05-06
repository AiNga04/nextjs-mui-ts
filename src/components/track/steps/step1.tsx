"use client";
import React, { useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import "./theme.scss";
import { InputAudioFileUpload } from "@/components/button/upload.btn";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
  setValue: (v: number) => void;
  setTrackUpload: any;
}

const Step1 = (props: IProps) => {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const { data: session } = useSession();
  const { setValue, setTrackUpload } = props;

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);

      if (acceptedFiles && acceptedFiles[0]) {
        console.log(">>> check audio: ", acceptedFiles[0]);
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onabort = () =>
          console.log(`${file.name}: file reading was aborted`);
        reader.onerror = () =>
          console.log(`${file.name}: file reading has failed`);
        reader.onload = async () => {
          setValue(1);
          setTrackUpload({});

          const files = new FormData();
          files.append("fileUpload", file);

          try {
            const res = await axios.post(
              "http://localhost:8000/api/v1/files/upload",
              files,
              {
                headers: {
                  Authorization: `Bearer ${session?.access_token}`,
                  target_type: "tracks",
                  delay: 3000,
                },
                onUploadProgress: (progressEvent) => {
                  let percentCompleted = Math.floor(
                    (progressEvent.loaded * 100) / progressEvent.total!
                  );

                  props.setTrackUpload({
                    fileName: acceptedFiles[0].name,
                    percent: percentCompleted,
                  });
                },
              }
            );

            console.log(">>> check res: ", res.data.data.fileName);
            setTrackUpload((prev: any) => ({
              ...prev,
              resFileName: res.data.data.fileName,
            }));
          } catch (error) {
            //@ts-ignore
            toast.error(error?.response?.data?.message);
          }
        };
        reader.readAsArrayBuffer(file);
      }
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
