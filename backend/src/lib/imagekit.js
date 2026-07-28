import ImageKit from "imagekit";

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function hasImageKitConfig() {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}

//helper function that create a safe unique filename for uploaded files
//originalname = "my photo (1).jpg"
//result = "chat-1674709274000-my-photo-1.jpg"

function createFileName(originalName = "upload") {
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `chat-${Date.now()}-${safeName}`;
}

//upload image or video to imagekit
async function uploadChatMedia(file) {
  const fileName = createFileName(file.originalname);
  const result = await imageKit.files.upload({
    file: await toFile(file.buffer, fileName, { type: file.mimeType }),
    fileName,
    folder: "/chat",
  });
  return result.url;
}

export { hasImageKitConfig, uploadChatMedia };
