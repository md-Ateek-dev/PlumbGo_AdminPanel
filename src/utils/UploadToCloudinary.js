export const UploadToCloudinary = async (file, folder = "plumbgo") => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "PlumbGo_unsigned"); // same preset
  formData.append("folder", folder);

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/djv97kkwe/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return await res.json();
};
