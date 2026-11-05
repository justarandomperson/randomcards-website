import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { ImagesMap } from './shared/types';
import { fetchImages } from '../../api/axiosInstance';


type ImagesContextType = {
    state: ImagesMap,
}


const ImagesContext = createContext<ImagesContextType | null>(null);


export const ImagesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ images, setImages ] = useState<ImagesMap>(new Map);

    useEffect(() => {
        const getStorage = async () => {
            const imagesObject = await fetchImages();
            const images: ImagesMap = new Map(imagesObject);
            
            setImages(images);
        }
        
        getStorage();
    }, []);

    const value = {
        state: images,
    }

    return <ImagesContext.Provider value={value}> {children} </ImagesContext.Provider>
}


export const useImagesContext = () => {
    const context = useContext(ImagesContext);
        
    if (!context) {
        throw new Error('useImagesContext must be used within a ImagesProvider');
    }
        
    return context;
}