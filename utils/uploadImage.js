//import { supabase } from "@supabase/auth-ui-shared";
import {supabase} from '@/lib/supabaseClient'

export const uploadImage = async (file) => {
        const fullFileName = file.name.split(".");
        const fileName = fullFileName[0];
        const fileExt = fullFileName[1];
    
        const filePath = `${fileName}-${Math.random()}.${fileExt}`
    
        const {data, error} = await supabase
        .storage
        .from ('images')
        .upload(filePath, file, {
            chacheControl: '3600',
            upset: false,
        });
    
        if (error) {
            return { error };
        }
    
       const {
        data: { publicUrl }, 
        error: publicUrlError
    } = await supabase
        .storage
        .from('images')
        .getPublicUrl(data.path);
    
       if(publicUrlError) {
        return { error: publicUrlError };
       }
    
       return{
        error: false,
        publicUrl,
       };
    };


