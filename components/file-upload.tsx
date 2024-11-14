// "use client"

// import { UploadDropzone } from "@/lib/uploadthing";
// import { ourFileRouter, OurFileRouter } from "@/app/api/uploadthing/core";
// import toast from "react-hot-toast";

// interface FileUploadProps {
//     onChange: (url?: string) => void;
//     endpoint: keyof typeof ourFileRouter;
// };

// export const FileUpload = ({
//     onChange,
//     endpoint
// }: FileUploadProps) => {
//     return (
//         <UploadDropzone
//         endpoint={endpoint}
//         onClientUploadComplete={(res) => {
//             if (res && res.length > 0) {
//                 onChange(res[0].url);
//                 toast.success("Upload successful!");
//             } else {
//                 console.error("Upload response is empty or invalid.");
//             }
//             onChange(res?.[0]?.url || undefined);
//         }}
//         onUploadError={(error: Error) => {
//             toast.error(`${error?.message}`);
//         }}
//         />
//     )
// }

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                console.log("Upload response:", res);
                if (res && res.length > 0) {
                    onChange(res[0].url);
                    toast.success("Upload successful!");
                } else {
                    console.error("Upload response is empty or invalid.");
                    toast.error("Upload failed. Try again.");
                }
            }}
            onUploadError={(error: Error) => {
                console.error("Upload error:", error);
                toast.error(`Upload failed: ${error.message}`);
            }}
        />
    );
};
