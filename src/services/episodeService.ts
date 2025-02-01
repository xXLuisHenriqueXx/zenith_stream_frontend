import { api } from "@services/api";
import { createEpisodeSchema, updateEpisodeSchema } from "@schemas/episodeSchema";
import { z } from "zod";

type createEpisodeParams = z.input<typeof createEpisodeSchema>;
type updateEpisodeParams = z.input<typeof updateEpisodeSchema>;

export const episodeService = {
    create: async (params: createEpisodeParams) => {
        try {
            const response = await api.post(`/episode/${params.seriesId}`, params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    update: async (params: updateEpisodeParams) => {
        try {
            const response = await api.put(`/episode/${params.id}`, params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    delete: async (id: string) => {
        try {
            const response = await api.delete(`/episode/${id}`);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }
}