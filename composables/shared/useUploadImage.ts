import {IUploadTestImage} from "~/composables/Interfaces/TestInterfaces/IUploadTestImage";

export const useUploadImage = () => {
    const { $httpRequest } = useNuxtApp();
    const uploadImage = async (image: string, source: string) => {

        // @ts-ignore
        const result = await $httpRequest.upload('file/upload/test-image', image, source);
        return result.path;
    }

    const uploadTestImages = async (images: IUploadTestImage[]) => {
        let result = await Promise.all(
            images.map(async image => {
                try {
                    return image.file = await uploadImage(image.file, image.source);
                } catch (e) {
                    return image.file = '/error-save-image';
                }
            })
        );

        return images
    }

    return { uploadImage, uploadTestImages };
}