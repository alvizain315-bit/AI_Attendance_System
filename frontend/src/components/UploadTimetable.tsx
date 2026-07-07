import { Button } from "@/components/ui/button";
import { useState } from "react";

export function UploadTimetable() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

  const file = e.target.files?.[0];

  if (!file) return;

  setSelectedFile(file);

  const formData = new FormData();
  formData.append("file", file);

  try {

    const response = await fetch(
      "http://localhost:5000/upload-timetable",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
  alert(data.message || "Timetable uploaded successfully");
} else {
  alert(data.error || "Upload failed");
}

  } catch (err) {
    console.log(err);
    alert("Upload failed");
  }

  };

  return (
    <div>

      <input
        type="file"
        id="timetable-upload"
        accept=".xlsx,.xls,.pdf,.doc,.docx"
        hidden
        onChange={handleUpload}
      />

      <label htmlFor="timetable-upload">
        <Button type="button" asChild>
          <span>
            {selectedFile ? selectedFile.name : "Upload Timetable"}
          </span>
        </Button>
      </label>

    </div>
  );

}