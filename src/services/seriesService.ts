import { api } from "@services/api";
import { createSeriesSchema, updateSeriesSchema } from "@schemas/seriesSchema";
import { z } from "zod";

type createSeriesParams = z.input<typeof createSeriesSchema>;
type updateSeriesParams = z.input<typeof updateSeriesSchema>;

export const seriesService = {
    getAll: async () => {
        try {
            const response = await api.get("/series");
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    createSoapOpera: async (params: createSeriesParams) => {
        try {
            const response = await api.post("/series/soap-opera", params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    createTvShow: async (params: createSeriesParams) => {
        try {
            const response = await api.post("/series/tv-show", params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    createAnime: async (params: createSeriesParams) => {
        try {
            const response = await api.post("/series/anime", params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    update: async (params: updateSeriesParams) => {
        try {
            const response = await api.put(`/series/${params.id}`, params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    delete: async (id: string) => {
        try {
            const response = await api.delete(`/series/${id}`);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }
};