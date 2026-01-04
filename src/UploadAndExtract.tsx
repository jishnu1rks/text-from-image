import { useState } from "react";
import Tesseract from "tesseract.js";

const UploadAndExtract = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("")

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
      extractFile(fileUrl);
    }
  };

  const extractFile = async (imageFile: string) => {
    try {
        const result = await Tesseract.recognize(
            imageFile,
            'eng',
            {
                logger: m => {
                    if(m.status === "recognizing text") {
                        console.log("Getting the text")
                    }
                }
            }
        )
        console.log(result)
        setText(result.data.text)
    }catch(err) {
        console.log(err)
    }
  }


  return (
    <div className="upload-container">
      {/* upload imgae */}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        onChange={onFileUpload}
      />
      {image && <img src={image} />}
      {/* show text of the image */}
      <div dangerouslySetInnerHTML={{ __html: text}} />
    </div>
  );
};
export default UploadAndExtract;
