// import { CLOUDINARY_CONFIG, CLOUDINARY_UPLOAD_OPTIONS } from '../config/cloudinary.config';

// export const cloudinaryService = {
  
//   // ✅ Upload vidéo avec progression
//   uploadVideo: async (file, onProgress) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_OPTIONS.upload_preset);
//     formData.append('folder', CLOUDINARY_UPLOAD_OPTIONS.folder);
//     formData.append('resource_type', 'video');
//     formData.append('tags', 'path,web');

//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();

//       // ✅ Suivi de la progression
//       xhr.upload.addEventListener('progress', (event) => {
//         if (event.lengthComputable && onProgress) {
//           const percent = Math.round((event.loaded / event.total) * 100);
//           onProgress(percent);
//         }
//       });

//       xhr.addEventListener('load', () => {
//         if (xhr.status === 200) {
//           const data = JSON.parse(xhr.responseText);
//           resolve({
//             url: data.secure_url,       // ✅ URL de la vidéo
//             publicId: data.public_id,   // ✅ ID Cloudinary
//             duration: data.duration,    // ✅ Durée en secondes
//           });
//         } else {
//           reject(new Error('Upload échoué'));
//         }
//       });

//       xhr.addEventListener('error', () => reject(new Error('Erreur réseau')));

//       xhr.open('POST', CLOUDINARY_CONFIG.UPLOAD_URL);
//       xhr.send(formData);
//     });
//   },
// };


import { CLOUDINARY_CONFIG, CLOUDINARY_UPLOAD_OPTIONS } from '../config/cloudinary.config';

export const cloudinaryService = {

  uploadVideo: async (file, onProgress) => {

    // ✅ Vérifier la taille avant upload (max 100MB)
    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error(
        `Fichier trop lourd. Maximum 100MB. Votre fichier : ${(file.size / 1024 / 1024).toFixed(1)}MB`
      );
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_OPTIONS.upload_preset);
    formData.append('folder', CLOUDINARY_UPLOAD_OPTIONS.folder);
    formData.append('tags', 'path,web');

    // ✅ Simuler la progression puisque fetch ne supporte pas onProgress
    onProgress?.(10);

    const response = await fetch(CLOUDINARY_CONFIG.UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    onProgress?.(90);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message || `Erreur upload : ${response.status}`
      );
    }

    const data = await response.json();
    onProgress?.(100);

    return {
      url: data.secure_url,
      publicId: data.public_id,
      duration: data.duration,
    };
  },
};