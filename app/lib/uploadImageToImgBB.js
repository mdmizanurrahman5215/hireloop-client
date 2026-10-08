export async function uploadImageToImgBB(file) {
  if (!file) return null;

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      return data.data.url; // Returns direct hosted image URL
    } else {
      throw new Error(data.error?.message || 'Image upload failed');
    }
  } catch (error) {
    console.error('ImgBB Upload Error:', error);
    throw error;
  }
}