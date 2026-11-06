
import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useState
} from 'react';

import { ImagesMap } from './shared/types';
import { fetchImages } from '../../api/axiosInstance';
import { getCachedImages, cacheImages } from './imageCache';

type ImagesContextType = {
    state: ImagesMap;
};

const ImagesContext = createContext<ImagesContextType | null>(null);

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const ImagesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [images, setImages] = useState<ImagesMap>(new Map());

    useEffect(() => {
        let mounted = true;

        const getStorage = async () => {
            try {
                const cachedTimestamp = localStorage.getItem('imagesTimestamp');

                if (
                    cachedTimestamp &&
                    Date.now() - Number(cachedTimestamp) < CACHE_DURATION
                ) {
                    const cachedImages = await getCachedImages();

                    if (cachedImages.size > 0) {
                        setImages(cachedImages);
                        return;
                    }
                }

                const imagesObject = await fetchImages();
                const newImages: ImagesMap = new Map(imagesObject);

                await cacheImages(newImages);

                localStorage.setItem(
                    'imagesTimestamp',
                    Date.now().toString()
                );

                if (mounted) {
                    setImages(newImages);
                }
            } catch (error) {
                console.log('failed to load images:', error);
                try {
                    const cachedImages = await getCachedImages();

                    if (mounted && cachedImages.size > 0) {
                        setImages(cachedImages);
                        return;
                    }
                } catch (error) {
                    console.log('failed to load cached images:', error);
                }
            }
        };

        getStorage();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <ImagesContext.Provider value={{ state: images }}>
            {children}
        </ImagesContext.Provider>
    );
};

export const useImagesContext = () => {
    const context = useContext(ImagesContext);

    if (!context) {
        throw new Error('useImagesContext must be used within a ImagesProvider');
    }

    return context;
};
