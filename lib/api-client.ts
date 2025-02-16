import { IVideo } from "@/models/Video";

 
export type VideoFormData = Omit<IVideo, "_id">

 // jyare pan Fetch Options aapsu tyare aapde ema object pass karsu.
 type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE";
    body? : any;
    headers? : Record<string, string> // Record ek key value pair chhe
 }
 
 
 class ApiClient{
    // T special type chhe
    private async fetch<T>(
        endpoint: string, // string pass karsu ke fetch request kya mokalvani chhe
        options: FetchOptions = {}
    ) : Promise<T>// Ano return type malse "Promise", jeno type T chhe
    {
        const {method = "GET", body, headers={}} = options
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

          // jo aapde this.fetch call karsu to "private async fetch" call thase 
        // aa niche je fetch chhe e java script no fetch call kariye chhiye aapde 
        // call kevi rite karsu 
        // back tik ni ander /api and ene concatenate karsu endpoint sathe. 
        // and pachhi options add karsu: method, headers
        const res = await fetch(`/api${endpoint}`,{
            method, 
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        if (!res.ok){
            throw new Error(await response.text());
        }
        return response.json()
    }

    async getVideos(){
        return this.fetch<IVideo[]>("/videos")
        // fetch method ne joiye ek end point: "/video", fetch ni data type ma IVideo no array jase
        // aa return ma actual ma return thase response.json()
        // jethi badhi api aa fetch this call thai jase
    }
     
    // Koi ek video play karvano chhe to 
    async getAVideos(id: string){
        return this.fetch<IVideo>(`/videos/${id}`)
    }

    async createVideo(videoData: VideoFormData){
        return this.fetch("/videos",{
            method: "POST",
            body: videoData
        })
    }
    
 } 

 // Aa apiclient ne export karva mate ApiClient no ek object banavsu
 // And ene apiClient variable ma store karsu ne aa variable ne export karsu
 // jethi ek j object ahiyathi export thase, and jya pan use karvu hoy tya apiClient j use karsu  
 export const apiClient =  new ApiClient()